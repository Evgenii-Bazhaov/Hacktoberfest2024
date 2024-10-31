#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>
#define MAX_SEQUENCE_LENGTH 10
#define MAX_KASISKI_KEY 100
#define ALPHABET_SIZE 26

// Helper functions
typedef struct {
    int distance;
    int frequency;
} d_f;

int calcOffset(char ch) {
    return tolower(ch) - 'a'; 
}

int compare_distance_freq(const void* a, const void* b) {
    return ((d_f*)b)->frequency - ((d_f*)a)->frequency;
}

// Encryption
char* Vig_Enc(FILE* plaintextFile, char key[], int n) {
    fseek(plaintextFile, 0, SEEK_END);
    long fileSize = ftell(plaintextFile);
    rewind(plaintextFile);

    char* encryptedtext = (char*)malloc(fileSize + 1);

    int i = 0;
    char ch;
    while (fscanf(plaintextFile, "%c", &ch) == 1) {
        if (islower(ch) || isupper(ch)) {
            char base = islower(ch) ? 'a' : 'A';
            char encryptedChar = (ch - base + calcOffset(key[i % n])) % 26 + base;
            encryptedtext[i] = encryptedChar;
        } else {
            encryptedtext[i] = ch; 
        }
        i++;
    }
    encryptedtext[i] = '\0';
    return encryptedtext;
}

// Decryption
char* Vig_Dec(const char* ciphertext, const char key[], int n) {
    int len = strlen(ciphertext);
    char* decryptedtext = (char*)malloc(len + 1);
    
    for (int i = 0; i < len; i++) {
        if (islower(ciphertext[i]) || isupper(ciphertext[i])) {
            char base = islower(ciphertext[i]) ? 'a' : 'A';
            decryptedtext[i] = (ciphertext[i] - base - calcOffset(key[i % n]) + 26) % 26 + base;
        } else {
            decryptedtext[i] = ciphertext[i];
        }
    }
    decryptedtext[len] = '\0';
    return decryptedtext;
}

// Analysis
double calculate_IC(char* group) {
    int letterCounts[26] = {0};
    int total = 0;

    for (int i = 0; group[i] != '\0'; i++) {
        if (islower(group[i]) || isupper(group[i])) {
            char ch = tolower(group[i]);
            letterCounts[ch - 'a']++;
            total++;
        }
    }

    double IC = 0.0;
    for (int i = 0; i < 26; i++) {
        IC += (letterCounts[i] * (letterCounts[i] - 1));
    }
    IC /= (total * (total - 1));
    
    return IC;
}

void IOC(char* ciphertext, int prediction, int len, int freq) {
    double IC = 0.0;
    double totalIC = 0.0;
    int validGroups = 0;
    int aboveThresholdCount = 0;

    for (int i = 0; i < prediction; i++) {
        int groupSize = (len - i + prediction - 1) / prediction;
        char group[groupSize + 1];
        int index = 0;

        for (int j = i; j < len; j += prediction) {
            group[index++] = ciphertext[j];
        }
        group[index] = '\0';

        IC = calculate_IC(group);
        totalIC += IC;
        validGroups++;

        if (IC > 0.05) {
            aboveThresholdCount++;
        }
    }

    double averageIC = totalIC / validGroups;
    double percentageAboveThreshold = (double)aboveThresholdCount / validGroups;

    if (averageIC > 0.06 && percentageAboveThreshold >= 0.9) {
        if (freq == -1) {
            printf("IOC Guess for Key length: %d Average IC: %f\n", prediction, averageIC);
        } else {
            printf("Kasiski Guess for Key length: %d Average IC: %f Frequency: %d\n", prediction, averageIC, freq);
        }
    }
}

void kasiski(char* ciphertext, int len) {
    d_f distances[MAX_KASISKI_KEY] = {0};

    for (int seq_len = 3; seq_len <= MAX_SEQUENCE_LENGTH; seq_len++) {
        for (int i = 0; i < len - seq_len; i++) {
            for (int j = i + seq_len; j < len - seq_len + 1; j++) {
                if (strncmp(ciphertext + i, ciphertext + j, seq_len) == 0) {
                    int distance = j - i;
                    if (distance < MAX_KASISKI_KEY) {
                        distances[distance].distance = distance;
                        distances[distance].frequency++;
                        
                        for (int factor = 1; factor < distance; factor++) {
                            if (distance % factor == 0) {
                                distances[factor].frequency++;
                            }
                        }
                    }
                }
            }
        }
    }

    qsort(distances, MAX_KASISKI_KEY, sizeof(d_f), compare_distance_freq);

    for (int i = 0; i < 10 && distances[i].frequency > 0; i++) {
        IOC(ciphertext, distances[i].distance, len, distances[i].frequency);
    }
}

void calculateFrequencies(const char* text, int* frequencies, int start, int step) {
    int len = strlen(text); 
    for (int i = start; i < len; i += step) { 
        if (isalpha(text[i])) {
            frequencies[tolower(text[i]) - 'a']++;
        }
    }
}

char findMostLikelyShift(int* frequencies) {
    const char* englishFreq = "etaoinshrdlcumwfgypbvkjxqz";
    int maxScore = 0;
    char bestShift = 0;

    for (int shift = 0; shift < ALPHABET_SIZE; shift++) {
        int score = 0;
        for (int i = 0; i < ALPHABET_SIZE; i++) {
            int shiftedIndex = (i + shift) % ALPHABET_SIZE;
            const char* position = strchr(englishFreq, 'a' + i);
            if (position != NULL) {
                int rank = position - englishFreq;
                score += frequencies[shiftedIndex] * (ALPHABET_SIZE - rank);
            }
        }
        if (score > maxScore) {
            maxScore = score;
            bestShift = shift;
        }
    }

    return 'a' + bestShift;
}

char* predictKey(const char* ciphertext, int keyLength) {
    char* predictedKey = (char*)malloc(keyLength + 1);
    int frequencies[ALPHABET_SIZE];

    for (int i = 0; i < keyLength; i++) {
        memset(frequencies, 0, sizeof(frequencies));
        calculateFrequencies(ciphertext, frequencies, i, keyLength);
        predictedKey[i] = findMostLikelyShift(frequencies);
    }
    predictedKey[keyLength] = '\0';

    return predictedKey;
}

void Vig_Analysis(char* ciphertext, int len) {
    int choice;
    printf("\nVigenere Analysis Options:\n");
    printf("1. IOC Analysis\n");
    printf("2. Kasiski Analysis\n");
    printf("3. Predict Key\n");
    printf("Enter your choice: ");
    scanf("%d", &choice);

    switch(choice) {
        case 1:
            for(int i = 1; i <= len; i++) IOC(ciphertext, i, len, -1);
            break;
        case 2:
            kasiski(ciphertext, len);
            break;
        case 3:
            {
                int keyLength;
                printf("Enter the estimated key length: ");
                scanf("%d", &keyLength);
                
                if (keyLength > 0 && keyLength <= MAX_KASISKI_KEY) {
                    char* predictedKey = predictKey(ciphertext, keyLength);
                    printf("Predicted key for length %d: %s\n", keyLength, predictedKey);
                    free(predictedKey);
                } else {
                    printf("Invalid key length. Please enter a value between 1 and %d.\n", MAX_KASISKI_KEY);
                }
            }
            break;
        default:
            printf("Invalid choice.\n");
    }
}

int main() {
    FILE* plaintextFile = NULL;
    char filename[100] = "None";
    char key[100] = "None";
    int n = 0;
    static char* encryptedtext = NULL;
    int len = 0;
    int choice = 0;

    while (choice != 5) {
        printf("\n=======================\n");
        printf("Options:\n");
        printf("1. Set file\n");
        printf("2. Encrypt\n");
        printf("3. Decrypt\n");
        printf("4. Vigenere Analysis\n");
        printf("5. Exit\n");
        printf("------------------------\n");
        printf("File: %s | Key: %s\n", (plaintextFile != NULL ? filename : "Not Set"), (n > 0 ? key : "Not Set"));
        printf("=======================\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter the filename: ");
                scanf("%s", filename);
                plaintextFile = fopen(filename, "r");
                if (plaintextFile == NULL) {
                    printf("Error opening file.\n");
                    strcpy(filename, "None");
                } else {
                    fseek(plaintextFile, 0, SEEK_END);
                    len = ftell(plaintextFile);
                    rewind(plaintextFile);
                    printf("Source file set as %s.\n", filename);
                }
                break;

            case 2:
                if (plaintextFile == NULL) {
                    printf("Please set the file first.\n");
                } else {
                    printf("Enter the key: ");
                    scanf("%s", key);
                    n = strlen(key);
                    if (encryptedtext != NULL) free(encryptedtext);
                    encryptedtext = Vig_Enc(plaintextFile, key, n);
                    printf("Encrypted text: %s\n", encryptedtext);
                    fclose(plaintextFile);
                    FILE* encryptedFile = fopen("encryptedtext.txt", "w");
                    if (encryptedFile == NULL) {
                        printf("Error creating encrypted file.\n");
                    } else {
                        fprintf(encryptedFile, "%s", encryptedtext);
                        fclose(encryptedFile);
                        printf("Encrypted text saved in encryptedtext.txt\n");
                    }
                }
                break;

            case 3:
                if (encryptedtext == NULL) {
                    printf("Please encrypt the text first.\n");
                } else {
                    printf("Enter the key: ");
                    scanf("%s", key);
                    n = strlen(key);
                    char* decryptedtext = Vig_Dec(encryptedtext, key, n);
                    printf("Decrypted text: %s\n", decryptedtext);
                    free(decryptedtext);
                }
                break;

            case 4:
                if (encryptedtext == NULL) {
                    printf("Please encrypt the text first.\n");
                } else {
                    Vig_Analysis(encryptedtext, len);
                }
                break;

            case 5:
                printf("Exited.\n");
                if (encryptedtext != NULL) {
                    free(encryptedtext);
                    encryptedtext = NULL;
                }
                if (plaintextFile != NULL) fclose(plaintextFile);
                break;

            default:
                printf("Invalid choice.\n");
                break;
        }
        printf("\n\n\n");
    }

    return 0;
}

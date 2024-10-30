import cv2 as cv
import dlib
from beepy import beep
from scipy.spatial import distance

# Formula based on research
def calculate_eye_aspect_ratio(eye):
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])
    ear_aspect_ratio = (A+B)/(2.0*C)
    return ear_aspect_ratio

cap = cv.VideoCapture(0)
hog_face_detector = dlib.get_frontal_face_detector()
dlib_facelandmark = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

i=0
while True:
    _, frame = cap.read()
    gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)

    faces = hog_face_detector(gray)
    for face in faces:

        face_landmarks = dlib_facelandmark(gray, face)
        leftEye = []
        rightEye = []

        for n in range(36,42):
            x = face_landmarks.part(n).x
            y = face_landmarks.part(n).y
            leftEye.append((x,y))
            next_point = n+1
            if n == 41:
                next_point = 36
            x2 = face_landmarks.part(next_point).x
            y2 = face_landmarks.part(next_point).y
            cv.line(frame,(x,y),(x2,y2),(0,255,0),1)

        for n in range(42,48):
            x = face_landmarks.part(n).x
            y = face_landmarks.part(n).y
            rightEye.append((x,y))
            next_point = n+1
            if n == 47:
                next_point = 42
            x2 = face_landmarks.part(next_point).x
            y2 = face_landmarks.part(next_point).y
            cv.line(frame,(x,y),(x2,y2),(0,255,0),1)

        left_ear = calculate_eye_aspect_ratio(leftEye)
        right_ear = calculate_eye_aspect_ratio(rightEye)

        ear = (left_ear+right_ear)/2
        ear = round(ear,2)
        if ear <= 0.20:
            i+=1
            if i==10:
                cv.putText(frame,"Drowsiness Detection",(20,50),
                cv.FONT_HERSHEY_SIMPLEX,1,(255,0,0),4)
                cv.putText(frame,"Warning",(20,100),
                cv.FONT_HERSHEY_SIMPLEX,1,(0,0,255),4)
                beep(sound=3)
                print("Drowsiness")
        else:
            i=0
        print(ear)

    cv.imshow("Drowsiness Detection", frame)

    key = cv.waitKey(1)
    if key == ord('q'):
        break

# release the file pointers    
cap.release()
cv.destroyAllWindows()

function shellSort(arr) {
    let n = arr.length;

    // Start with a large gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        
        // Perform a gapped insertion sort for this gap size
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j;

            // Shift earlier gap-sorted elements up until the correct location for arr[i] is found
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }

            // Place temp (the original arr[i]) in its correct location
            arr[j] = temp;
        }
    }
}

// Example usage
let array = [64, 34, 25, 12, 22, 11, 90];
console.log("Original Array:", array);

shellSort(array);
console.log("Sorted Array:", array);

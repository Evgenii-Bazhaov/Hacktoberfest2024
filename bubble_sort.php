<?php

function bubbleSort($arr) {
	$n = count($arr);

	// Traverse through all array elements
	for ($i = 0; $i < $n - 1; $i++) {
		for ($j = 0; $j < $n - $i - 1; $j++) {

			// Swap if the element found is 
			// greater than the next element
			if ($arr[$j] > $arr[$j + 1]) {
				$temp = $arr[$j];
				$arr[$j] = $arr[$j + 1];
				$arr[$j + 1] = $temp;
			}
		}
	}

	return $arr;
}

// Driver code
$arr = [61, 33, 22, 14, 27, 15, 92];
$sortedArray = bubbleSort($arr);

// Print the sorted array
echo "Sorted array: "
	. implode(", ", $sortedArray);

?>
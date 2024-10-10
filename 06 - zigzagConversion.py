def convert(s: str, numRows: int) -> str:
    arr = ['']*numRows
    finalStr = ''
    for index, word in enumerate(s):
        if numRows == 1:
            temp = 0
        elif numRows == 2:
            temp = index % 2
        else:
            temp = index % (2 * numRows - 2)
            
        if temp >= numRows:
            temp = numRows - (temp - numRows) - 2
        arr[temp] = arr[temp] + word
    for i in arr:
        finalStr = finalStr + i
    return finalStr

if __name__ == '__main__':
    s = "PAYPALISHIRING"
    numRows = 3
    print(convert(s, numRows))
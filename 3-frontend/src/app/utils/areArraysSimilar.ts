export function areArraysSimilar(arr1: string[], arr2: string[]): boolean {
    // Check if both arrays have the same length
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    // Sort both arrays to ensure consistent comparison
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();
  
    // Compare each element in the sorted arrays
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }
  
    return true;
  }
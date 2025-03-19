/**
 * Generates a CSV file with headers and optional sample data
 * @param headers - Array of column headers
 * @param sampleData - Optional array of sample data rows
 * @returns Blob containing the CSV file
 */
export const generateCSV = (
  headers: string[],
  sampleData?: string[][]
): Blob => {
  // Create CSV content starting with headers
  let csvContent = headers.join(",") + "\n";

  // Add sample data if provided
  if (sampleData && sampleData.length > 0) {
    sampleData.forEach(row => {
      csvContent += row.join(",") + "\n";
    });
  }

  // Create and return blob with CSV content
  return new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
};

/**
 * Triggers a file download for the given blob
 * @param blob - The blob to download
 * @param filename - The name to give the downloaded file
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link element
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  
  // Append to the document, click to trigger download, then clean up
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};

/**
 * Generate and download a client import template CSV file
 */
export const downloadClientImportTemplate = (): void => {
  // Define headers for client import
  const headers = ["Name", "Email", "Plan ID"];
  
  // Define sample data (optional)
  const sampleData = [
    ["John Doe", "john@example.com", "plan-1"],
    ["Jane Smith", "jane@example.com", "plan-2"]
  ];
  
  // Generate CSV and trigger download
  const csvBlob = generateCSV(headers, sampleData);
  downloadBlob(csvBlob, "client-import-template.csv");
};

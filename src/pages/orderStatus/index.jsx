import {
  CheckCircle,
  CreditCard,
  Hash,
  Receipt,
  DollarSign,
  IndianRupee,
  Download,
  Share2,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function OrderStatus() {
  const [transactionData, settransactionData] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (orderId) {
      fetch(`https://api.zrema.in/payment/verify/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Verification result:", data);
          settransactionData(data);
        })
        .catch((err) => {
          console.error("API error:", err);
        });
    }
  }, [orderId]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);
  };

  // Generate receipt content for download
  const generateReceiptContent = () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    return `
PAYMENT RECEIPT
=====================================

Transaction Details:
- Status: ${transactionData.status || "Completed"}
- Amount: ${transactionData.amount || "N/A"}
- Transaction ID: ${transactionData.transactionId || "N/A"}
- Merchant Order ID: ${transactionData.merchantOrderId || "N/A"}
- Date: ${date}
- Time: ${time}

=====================================
Transaction processed securely
Thank you for your payment!
=====================================
    `.trim();
  };

  // Download receipt functionality (Text format)
  const handleDownloadReceipt = () => {
    setIsDownloading(true);

    try {
      const receiptContent = generateReceiptContent();
      const blob = new Blob([receiptContent], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `receipt-${
        transactionData.transactionId || orderId || "transaction"
      }.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Show success feedback
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    } catch (error) {
      console.error("Download failed:", error);
      setIsDownloading(false);
      alert("Failed to download receipt. Please try again.");
    }
  };

  // Generate PDF using jsPDF library
  const generatePDF = () => {
    // Create a simple PDF content using canvas and manual text placement
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size for A4-like proportions
    canvas.width = 600;
    canvas.height = 800;

    // Fill background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";

    // Header
    ctx.font = "bold 24px Arial";
    ctx.fillText("PAYMENT RECEIPT", canvas.width / 2, 60);

    // Draw a line under header
    ctx.beginPath();
    ctx.moveTo(50, 80);
    ctx.lineTo(canvas.width - 50, 80);
    ctx.strokeStyle = "#333333";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Transaction details
    ctx.font = "16px Arial";
    ctx.textAlign = "left";

    const details = [
      `Status: ${transactionData.status || "Completed"}`,
      `Amount: ${transactionData.amount || "N/A"}`,
      `Transaction ID: ${transactionData.transactionId || "N/A"}`,
      `Merchant Order ID: ${transactionData.merchantOrderId || "N/A"}`,
      `Date: ${new Date().toLocaleDateString()}`,
      `Time: ${new Date().toLocaleTimeString()}`,
    ];

    let yPosition = 140;
    details.forEach((detail) => {
      ctx.fillText(detail, 80, yPosition);
      yPosition += 30;
    });

    // Footer
    ctx.textAlign = "center";
    ctx.font = "14px Arial";
    ctx.fillText(
      "Transaction processed securely",
      canvas.width / 2,
      yPosition + 60
    );
    ctx.fillText(
      "Thank you for your payment!",
      canvas.width / 2,
      yPosition + 90
    );

    return canvas;
  };

  // Download PDF functionality
  const handleDownloadPDF = async () => {
    setIsDownloading(true);

    try {
      // Method 1: Using canvas to create PDF-like image
      const canvas = generatePDF();

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          // Create download link for the image
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");

          link.href = url;
          link.download = `receipt-${
            transactionData.transactionId || orderId || "transaction"
          }.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          setTimeout(() => {
            setIsDownloading(false);
          }, 1000);
        },
        "image/png",
        1.0
      );
    } catch (error) {
      console.error("PDF generation failed:", error);
      setIsDownloading(false);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  // Alternative: Create a printable version
  const handlePrintReceipt = () => {
    const printWindow = window.open("", "_blank");
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            color: #333;
          }
          .details {
            margin: 30px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #eee;
          }
          .label {
            font-weight: bold;
            color: #555;
          }
          .value {
            color: #333;
            font-family: 'Courier New', monospace;
          }
          .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #333;
            color: #666;
            font-size: 14px;
          }
          .amount-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
          }
          .amount {
            font-size: 36px;
            font-weight: bold;
            color: #2c5530;
          }
          @media print {
            body { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>PAYMENT RECEIPT</h1>
          <p>Transaction Confirmation</p>
        </div>
        
        <div class="amount-section">
          <div style="color: #666; font-size: 14px; margin-bottom: 8px;">AMOUNT PAID</div>
          <div class="amount">${transactionData.amount || "N/A"}</div>
        </div>
        
        <div class="details">
          <div class="detail-row">
            <span class="label">Status:</span>
            <span class="value">${transactionData.status || "Completed"}</span>
          </div>
          <div class="detail-row">
            <span class="label">Transaction ID:</span>
            <span class="value">${transactionData.transactionId || "N/A"}</span>
          </div>
          <div class="detail-row">
            <span class="label">Merchant Order ID:</span>
            <span class="value">${
              transactionData.merchantOrderId || "N/A"
            }</span>
          </div>
          <div class="detail-row">
            <span class="label">Date:</span>
            <span class="value">${new Date().toLocaleDateString()}</span>
          </div>
          <div class="detail-row">
            <span class="label">Time:</span>
            <span class="value">${new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Transaction processed securely</strong></p>
          <p>Thank you for your payment!</p>
          <p style="margin-top: 20px; font-size: 12px;">
            This is an electronic receipt. Please keep it for your records.
          </p>
        </div>
        
        <div class="no-print" style="text-align: center; margin-top: 30px;">
          <button onclick="window.print()" style="
            background: #007bff;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
          ">Print Receipt</button>
          <button onclick="window.close()" style="
            background: #6c757d;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            margin-left: 10px;
          ">Close</button>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
  };

  // Share functionality
  const handleShare = async () => {
    setIsSharing(true);

    const shareData = {
      title: "Payment Receipt",
      text: `Payment successful! Transaction ID: ${
        transactionData.transactionId || "N/A"
      }, Amount: ${transactionData.amount || "N/A"}`,
      url: window.location.href,
    };

    try {
      // Check if Web Share API is supported
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        const shareText = `Payment Successful!\n\nTransaction ID: ${
          transactionData.transactionId || "N/A"
        }\nAmount: ${transactionData.amount || "N/A"}\nStatus: ${
          transactionData.status || "Completed"
        }\n\nView details: ${window.location.href}`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareText);
          alert("Receipt details copied to clipboard!");
        } else {
          // Fallback for older browsers
          const textArea = document.createElement("textarea");
          textArea.value = shareText;
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          alert("Receipt details copied to clipboard!");
        }
      }
    } catch (error) {
      console.error("Share failed:", error);
      alert("Failed to share. Please try again.");
    } finally {
      setTimeout(() => {
        setIsSharing(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-8 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Payment Successful
            </h1>
            <p className="text-pink-100">Transaction completed successfully</p>
          </div>

          {/* Transaction Details */}
          <div className="p-6 space-y-6">
            {/* Amount */}
            <div className="text-center pb-6 border-b border-pink-100">
              <div className="flex items-center justify-center mb-2">
                <IndianRupee className="w-6 h-6 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-pink-600 uppercase tracking-wide">
                  Amount
                </span>
              </div>
              <div className="text-4xl font-bold text-gray-800">
                {transactionData.amount}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between p-4 bg-pink-50 rounded-xl">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-pink-500 mr-3" />
                <span className="text-sm font-medium text-gray-600">
                  Status
                </span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                {transactionData.status}
              </span>
            </div>

            {/* Transaction Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <Hash className="w-5 h-5 text-pink-500 mr-3" />
                  <span className="text-sm font-medium text-gray-600">
                    Transaction ID
                  </span>
                </div>
                <span className="text-sm text-gray-800 font-mono">
                  {transactionData.transactionId}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <Receipt className="w-5 h-5 text-pink-500 mr-3" />
                  <span className="text-sm font-medium text-gray-600">
                    Merchant Order ID
                  </span>
                </div>
                <span className="text-sm text-gray-800 font-mono">
                  {transactionData.merchantOrderId}
                </span>
              </div>
            </div>

            {/* Full Details (Expandable) */}
            <details className="group">
              <summary className="flex items-center justify-between p-4 bg-pink-50 rounded-xl cursor-pointer hover:bg-pink-100 transition-colors">
                <span className="text-sm font-medium text-pink-600">
                  View Full Details
                </span>
                <span className="text-pink-500 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-3">
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <span className="font-medium text-gray-500">
                    Transaction ID:
                  </span>
                  <span className="col-span-2 font-mono text-gray-800 break-all">
                    {transactionData.transactionId}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <span className="font-medium text-gray-500">
                    Merchant Order ID:
                  </span>
                  <span className="col-span-2 font-mono text-gray-800 break-all">
                    {transactionData.merchantOrderId}
                  </span>
                </div>
              </div>
            </details>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              {/* Primary Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadReceipt}
                  disabled={isDownloading}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isDownloading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Downloading...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Download Receipt
                    </div>
                  )}
                </button>
                <button
                  onClick={handleShare}
                  disabled={isSharing}
                  className="flex-1 bg-white border-2 border-pink-500 text-pink-500 py-3 px-4 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSharing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-500 mr-2"></div>
                      Sharing...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </div>
                  )}
                </button>
              </div>

              {/* Secondary Download Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="flex-1 bg-blue-100 border border-blue-300 text-blue-700 py-2 px-4 rounded-xl font-medium hover:bg-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download as Image
                </button>
                <button
                  onClick={handlePrintReceipt}
                  className="flex-1 bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center text-sm"
                >
                  <Receipt className="w-4 h-4 mr-2" />
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Transaction processed securely • {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

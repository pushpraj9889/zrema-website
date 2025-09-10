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
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OrderStatus() {
  const [transactionData, settransactionData] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const navigate = useNavigate();

  console.log("transactionData", transactionData);

  useEffect(() => {
    if (orderId) {
      fetch(`https://api.zrema.com/payment/verify/${orderId}`)
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

Shipping Information:
- Address: ${transactionData.details?.shipping_address || "N/A"}
- Pincode: ${transactionData.details?.shipping_pincode || "N/A"}

Product Details:
${
  transactionData.details?.products
    ?.map(
      (product, index) =>
        `- ${product.name || "Product"} (${
          product.product_code || "N/A"
        })\n  Description: ${product.description || "N/A"}\n  MRP: ₹${
          product.mrp || "N/A"
        }`
    )
    .join("\n") || "No products found"
}

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
    canvas.height = 900; // Increased height for more content

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
      `Amount: ₹${transactionData.amount || "N/A"}`,
      `Transaction ID: ${transactionData.transactionId || "N/A"}`,
      `Merchant Order ID: ${transactionData.merchantOrderId || "N/A"}`,
      `Date: ${new Date().toLocaleDateString()}`,
      `Time: ${new Date().toLocaleTimeString()}`,
      ``,
      `Shipping Information:`,
      `Address: ${transactionData.details?.shipping_address || "N/A"}`,
      `Pincode: ${transactionData.details?.shipping_pincode || "N/A"}`,
    ];

    let yPosition = 140;
    details.forEach((detail) => {
      if (detail === "Shipping Information:") {
        ctx.font = "bold 16px Arial";
      } else if (detail === "") {
        yPosition += 10; // Add space
        return;
      } else {
        ctx.font = "16px Arial";
      }
      ctx.fillText(detail, 80, yPosition);
      yPosition += 30;
    });

    // Product details
    if (transactionData.details?.products?.length > 0) {
      ctx.font = "bold 16px Arial";
      ctx.fillText("Product Details:", 80, yPosition);
      yPosition += 30;

      ctx.font = "14px Arial";
      transactionData.details.products.forEach((product) => {
        ctx.fillText(`• ${product.name || "Product"}`, 100, yPosition);
        yPosition += 20;
        ctx.fillText(
          `  Code: ${product.product_code || "N/A"}`,
          100,
          yPosition
        );
        yPosition += 20;
        ctx.fillText(`  MRP: ₹${product.mrp || "N/A"}`, 100, yPosition);
        yPosition += 30;
      });
    }

    // Footer
    ctx.textAlign = "center";
    ctx.font = "14px Arial";
    ctx.fillText(
      "Transaction processed securely",
      canvas.width / 2,
      yPosition + 40
    );
    ctx.fillText(
      "Thank you for your payment!",
      canvas.width / 2,
      yPosition + 70
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

  // Share functionality
  const handleShare = async () => {
    setIsSharing(true);

    const shareData = {
      title: "Payment Receipt",
      text: `Payment successful! Transaction ID: ${
        transactionData.transactionId || "N/A"
      }, Amount: ₹${transactionData.amount || "N/A"}, Shipping to: ${
        transactionData.details?.shipping_address || "N/A"
      } - ${transactionData.details?.shipping_pincode || "N/A"}`,
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
        const shareText = `Payment Successful!

Transaction Details:
• Transaction ID: ${transactionData.transactionId || "N/A"}
• Amount: ₹${transactionData.amount || "N/A"}
• Status: ${transactionData.status || "Completed"}

Shipping Information:
• Address: ${transactionData.details?.shipping_address || "N/A"}
• Pincode: ${transactionData.details?.shipping_pincode || "N/A"}

${
  transactionData.details?.products?.length > 0
    ? `Products:\n${transactionData.details.products
        .map(
          (product) =>
            `• ${product.name || "Product"} (₹${product.mrp || "N/A"})`
        )
        .join("\n")}`
    : ""
}

View details: ${window.location.href}`;

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
            <p className="text-pink-100">
              Transaction {transactionData?.status?.toLowerCase()}
            </p>
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
                ₹{transactionData.amount}
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

            {/* Shipping Information */}
            {(transactionData.details?.shipping_address ||
              transactionData.details?.shipping_pincode) && (
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-pink-500 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-600 block">
                      Shipping Address
                    </span>
                    <span className="text-sm text-gray-800">
                      {transactionData.details?.shipping_address}
                    </span>
                    {transactionData.details?.shipping_pincode && (
                      <span className="text-sm text-gray-600 block">
                        PIN: {transactionData.details.shipping_pincode}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

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

                {/* Product Details */}
                {transactionData.details?.products?.length > 0 && (
                  <div className="pt-2 border-t border-gray-200">
                    <span className="font-medium text-gray-500 text-xs block mb-2">
                      Products:
                    </span>
                    {transactionData.details.products.map((product, index) => (
                      <div
                        key={index}
                        className="mb-2 p-2 bg-white rounded border"
                      >
                        <div className="text-xs font-medium text-gray-700">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Code: {product.product_code} | MRP: ₹{product.mrp}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </details>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              {/* Primary Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="flex-1 bg-pink-500 border border-pink-300 text-white py-2 px-4 rounded-xl font-medium disabled:cursor-not-allowed flex items-center justify-center text-sm"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {isDownloading ? "Downloading..." : "Download Receipt"}
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
            </div>
            <button
              onClick={() => {
                navigate("/OrderHistroy");
              }}
              className="group relative flex-1 bg-gradient-to-r from-pink-500 via-pink-600 to-rose-500 hover:from-pink-600 hover:via-pink-700 hover:to-rose-600 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-pink-500/30 flex items-center justify-center text-sm overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
            >
              <FileText className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
              View Order History
            </button>
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

import SellerDashboard from "@/components/seller-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Seller Dashboard",
    description: "Seller Dashboard page",
};

export default function SellerPage() {

    return (
        <div className="min-h-content">
            <SellerDashboard />
        </div>
    );
}
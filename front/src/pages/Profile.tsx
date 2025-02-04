import NotificationPage from "@/components/profile/notification/NotificationPage";
import { SubscriptionWrapper } from "@/components/profile/subscription/SubscriptionWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Profile() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState<string>(
        searchParams.get("tab") || "subscription",
    );

    const handleTabChange = (key: string) => {
        setActiveTab(key);
        searchParams.set("tab", key);
        setSearchParams(searchParams);
    };

    return (
        <Tabs defaultValue={activeTab} className="w-full">
            <TabsList>
                <TabsTrigger
                    value="subscription"
                    onClick={() => handleTabChange("subscription")}
                >
                    Abonnement
                </TabsTrigger>
                <TabsTrigger
                    value="notification"
                    onClick={() => handleTabChange("notification")}
                >
                    Notification
                </TabsTrigger>
            </TabsList>
            <TabsContent value="subscription">
                <SubscriptionWrapper />
            </TabsContent>
            <TabsContent value="notification">
                <NotificationPage />
            </TabsContent>
        </Tabs>
    );
}

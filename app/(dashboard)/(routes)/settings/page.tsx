import { Settings } from "lucide-react";

import Heading from "@/components/Heading";
import { SubscriptionButton } from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div>
      <Heading
        {...{
          title: "Settings",
          desc: "Manage account settings",
          icon: Settings,
          iconColor: "text-gray-700",
          bgColor: "bg-gray-700/10",
        }}
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">{`You are currently on a ${
          isPro ? "pro" : "free"
        } plan`}</div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;

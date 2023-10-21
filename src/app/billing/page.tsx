import { getUserSubscriptionPlan } from "@/lib/stripe";
import BillingForm from "./billingform";

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  console.log(subscriptionPlan);

  return (
    <div className="flex h-[calc(100vh-10rem)] w-screen items-center justify-center">
      {subscriptionPlan.isSubscribed && !subscriptionPlan.isCanceled ? (
        <BillingForm subscriptionPlan={subscriptionPlan} />
      ) : (
        <BillingForm subscriptionPlan={subscriptionPlan} />
      )}
    </div>
  );
};

export default Page;

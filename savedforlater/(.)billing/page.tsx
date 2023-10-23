import { getUserSubscriptionPlan } from "@/lib/stripe";
import BillingForm from "../../src/app/settings/components/billing/billingform";

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <div className="mx-auto w-full max-w-[60%]">
      <BillingForm subscriptionPlan={subscriptionPlan} />
    </div>
  );
};

export default Page;

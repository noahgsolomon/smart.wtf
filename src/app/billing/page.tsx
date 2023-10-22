import { getUserSubscriptionPlan } from "@/lib/stripe";
import BillingForm from "./billingform";

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  console.log(subscriptionPlan);

  return (
    <div className="flex h-[calc(100vh-10rem)] w-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-[60%] flex-col">
        <h3 className="text-xl">Billing</h3>
        <BillingForm subscriptionPlan={subscriptionPlan} />
      </div>
    </div>
  );
};

export default Page;

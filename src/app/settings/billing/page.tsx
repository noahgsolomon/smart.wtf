import { getUserSubscriptionPlan } from "@/lib/stripe";
import BillingForm from "../components/billing/billingform";

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <div className="mx-10 mt-40 flex w-full flex-col">
      <h3 className="mb-2 text-3xl font-bold">Billing</h3>
      <p className="mb-4 opacity-60 ">Manage account billing</p>
      <BillingForm subscriptionPlan={subscriptionPlan} />
    </div>
  );
};

export default Page;

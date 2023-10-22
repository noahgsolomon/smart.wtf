import { getUserSubscriptionPlan } from "@/lib/stripe";
import BillingForm from "../../billing/billingform";
import Modal from "@/components/Modal";
import { Suspense } from "react";

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <Modal>
      <Suspense fallback={<></>}>
        <div className="mx-auto w-full max-w-[60%]">
          <BillingForm subscriptionPlan={subscriptionPlan} />
        </div>
      </Suspense>
    </Modal>
  );
};

export default Page;

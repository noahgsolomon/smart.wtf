import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import functionImage from "public/function.png";
import { Progress } from "@/components/ui/progress";

const CalculusOverview = () => {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:border-primary hover:shadow-md ">
      <div className="overflow-hidden border-b border-border">
        <div className="relative cursor-pointer">
          <Image
            src={functionImage}
            width={325}
            height={325}
            className="rounded-t-lg transition-all group-hover:scale-105"
            alt="calculus"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h2 className="max-w-[20ch] text-xl">
          Multivariable Calculus Overview.pdf
        </h2>
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-sm">Progress</h3>
            <div className="flex flex-row items-center gap-2">
              <h3 className="text-xs opacity-60">30%</h3>
              <Progress indicatorClassName="rounded-r-lg" value={30} />
            </div>
          </div>

          <div>
            <Badge>PDF</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculusOverview;

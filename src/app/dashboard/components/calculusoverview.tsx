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
            width={300}
            height={300}
            className="rounded-t-lg transition-all group-hover:scale-105"
            alt="calculus"
          />
        </div>
      </div>

      <div className="flex h-[200px] flex-col justify-between gap-2 p-4">
        <h2 className="max-w-[20ch] text-xl">
          Multivariable Calculus Overview.pdf
        </h2>
        <div className="flex flex-row items-center gap-2">
          <h3 className="text-xs opacity-60">30%</h3>
          <Progress value={30} />
        </div>
        <div>
          <Badge>PDF</Badge>
        </div>
      </div>
    </div>
  );
};

export default CalculusOverview;

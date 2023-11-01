import { MDXRemote } from "next-mdx-remote/rsc";

export default async function Page() {
  const file = await new Promise((resolve) => {
    resolve(`# Welcome to my MDX page!

  This is some **ss bold** and _italics_ text.

  This is a list in markdown:

  - One
  - Two
  - Three

  Checkout my React component:`);
  });

  return (
    <div className="mt-28 flex justify-center">
      <div className=" prose dark:prose-invert">
        {typeof file === "string" ? <MDXRemote source={file} /> : null}
      </div>
    </div>
  );
}

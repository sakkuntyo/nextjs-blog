import { withBasePath } from "./withBasePath";
import { remark } from "remark";
import html from "remark-html";

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(() => (tree) => {
    function visit(node: any) {
      if ((node.type === "image" || node.type === "link" || node.type === "definition") && node.url) {
        node.url = withBasePath(node.url);
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  }).use(html).process(markdown);
  return result.toString();
}

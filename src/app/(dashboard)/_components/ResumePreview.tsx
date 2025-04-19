import React from "react";
import { ResumePreviewProps } from "@/types";
import ModernTemplete from "./ModernTemplete";
import ClassicTemplete from "./ClassicTemplete";



const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {


  
  if (template === "modern") {
    return (
     <ModernTemplete data={data} template={template}/>
    );
  }
 
    return (
      <ClassicTemplete data={data} template={template}/>
    );

};

export default ResumePreview;

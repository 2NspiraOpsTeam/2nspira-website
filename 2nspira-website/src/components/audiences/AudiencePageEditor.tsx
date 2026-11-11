"use client";
import type { AudiencePage } from "@/lib/audiences/model";
import { field } from "@/components/ui";
const secondary = "min-h-11 rounded-xl border border-line px-4 py-2 text-sm disabled:opacity-50";
export default function AudiencePageEditor({page:p,onChange,path}:{page:AudiencePage;onChange:(page:AudiencePage)=>void;path:string}) {
  const text = (label:string,value:string,change:(v:string)=>void,multi=false,max=3000) => <label className="block text-sm font-medium">{label}{multi?<textarea rows={3} className={field} maxLength={max} value={value} onChange={e=>change(e.target.value)}/>:<input className={field} maxLength={max} value={value} onChange={e=>change(e.target.value)}/>}</label>;
  const strings = [
    ["seoTitle","SEO title",false,160], ["seoDescription","SEO description",true,320],
    ["headline","Dedicated page headline",false,3000], ["intro","Dedicated page introduction",true,3000],
    ["advisoryTitle","Advisory heading",false,3000], ["advisoryText","Advisory scope",true,3000],
    ["implementationTitle","Implementation heading",false,3000], ["implementationText","Implementation scope",true,3000],
    ["ctaTitle","Conversation heading",false,3000], ["ctaText","Conversation invitation",true,3000], ["ctaLabel","Booking button label",false,3000],
  ] as const;
  return <section className="space-y-5 rounded-2xl bg-canvas-deep p-4 sm:p-6" aria-label="Dedicated audience page editor">
    <h3 className="text-xl font-semibold">Dedicated audience page</h3>
    <p className="break-words text-sm leading-6">Page address: <a className="text-accent underline" href={path}>{path}</a>. The address stays fixed when you edit the audience name. The visibility setting above controls the overview, dropdown, page and sitemap together.</p>
    {strings.map(([key,label,multi,max])=><div key={key}>{text(label,p[key],v=>onChange({...p,[key]:v}),multi,max)}</div>)}
    {(["challenges","services","examples"] as const).map(key=><section key={key} className="space-y-4 border-t border-line pt-5">
      <h4 className="text-lg font-semibold">{key === "challenges" ? "Everyday challenges" : key === "services" ? "Services & practical outcomes" : "Work examples & demos"}</h4>
      {key==="examples" && <p className="text-sm leading-6">Include only verified work or clearly labeled demos/internal projects. Describe the actual scope, not unverified client relationships or results. Remove all examples if none are available.</p>}
      {p[key].length===0 && <p className="text-sm text-body">No examples. This section will not appear on the page.</p>}
      {p[key].map((item,index)=><div key={index} className="space-y-3 rounded-xl border border-line bg-white p-4">
        {text(`${key} ${index+1} title`,item.title,v=>onChange({...p,[key]:p[key].map((r,n)=>n===index?{...r,title:v}:r)}))}
        {"kind" in item && text(`Example ${index+1} type / relationship label`,item.kind,v=>onChange({...p,examples:p.examples.map((r,n)=>n===index?{...r,kind:v}:r)}))}
        {text(`${key} ${index+1} text`,item.text,v=>onChange({...p,[key]:p[key].map((r,n)=>n===index?{...r,text:v}:r)}),true)}
        {"href" in item && text(`${key} ${index+1} link`,item.href,v=>onChange({...p,[key]:p[key].map((r,n)=>n===index?{...r,href:v}:r)}))}
        <div className="flex flex-wrap gap-2">
          <button type="button" className={secondary} disabled={index===0} onClick={()=>{const rows=[...p[key]];[rows[index-1],rows[index]]=[rows[index],rows[index-1]];onChange({...p,[key]:rows});}}>Move item up</button>
          <button type="button" className={secondary} disabled={index===p[key].length-1} onClick={()=>{const rows=[...p[key]];[rows[index+1],rows[index]]=[rows[index],rows[index+1]];onChange({...p,[key]:rows});}}>Move item down</button>
          <button type="button" className={secondary} disabled={key!=="examples" && p[key].length<=1} onClick={()=>onChange({...p,[key]:p[key].filter((_,n)=>n!==index)})}>Remove item</button>
        </div>
      </div>)}
      <button type="button" className={secondary} disabled={p[key].length>=8} onClick={()=>onChange({...p,[key]:[...p[key],{title:"",text:"",...(key!=="challenges"?{href:""}:{}),...(key==="examples"?{kind:""}:{})}]})}>Add {key==="challenges"?"challenge":key==="services"?"service":"example"}</button>
    </section>)}
  </section>;
}

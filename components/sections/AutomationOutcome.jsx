"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Play,
  Workflow,
  ShieldCheck,
  UserCheck,
  ArrowRight,
} from "lucide-react";


const steps = [
  {
    title: "Signal detected",
    text: "AI identified a high-value expansion opportunity.",
    icon: Workflow,
  },
  {
    title: "Evidence validated",
    text: "Multiple data sources confirm the recommendation.",
    icon: ShieldCheck,
  },
  {
    title: "Action prepared",
    text: "Automation workflow generated for review.",
    icon: UserCheck,
  },
];


export default function AutomationOutcome(){

const [running,setRunning]=useState(false);
const [complete,setComplete]=useState(false);


function runAutomation(){

setRunning(true);

setTimeout(()=>{
setComplete(true);
setRunning(false);
},2500);

}


return(

<section id="automation" className="automationSection">


<div className="automationHeader">

<span>04 / AI AUTOMATION</span>

<h2>
Insight becomes
coordinated action.
</h2>

<p>
Xai transforms intelligence into
explainable workflows while keeping
human control.
</p>

</div>



<div className="automationGrid">


<div className="automationFlow">


<div className="automationTop">

<span>Automation workflow</span>

<strong>
Expansion opportunity engine
</strong>

</div>



{
steps.map((step,index)=>{

const Icon=step.icon;

return(

<motion.div

key={step.title}

className={`automationStep ${
complete ? "active": ""
}`}

initial={{opacity:0,y:20}}

whileInView={{
opacity:1,
y:0
}}

transition={{
delay:index*.15
}}

>

<div className="automationIcon">

{
complete ?

<Check size={18}/>

:

<Icon size={18}/>
}

</div>


<div>

<h3>{step.title}</h3>

<p>
{step.text}
</p>

</div>


</motion.div>

)

})

}



<button

onClick={runAutomation}

disabled={running || complete}

className="automationButton"

>

<Play size={15}/>

{
complete
?
"Completed"

:

running
?

"Running..."

:

"Run automation"

}

</button>


</div>





<div className="automationResult">


<span>
AI RECOMMENDATION
</span>


<h3>
Increase revenue opportunity by 18.4%
</h3>


<p>

Seven accounts show strong
purchase intent and product adoption.

</p>



<div className="resultCard">


<div>

<small>
Potential Impact
</small>

<strong>
$184K
</strong>

</div>


<div>

<small>
Confidence
</small>

<strong>
94%
</strong>

</div>


</div>



<button className="reviewButton">

Review action

<ArrowRight size={15}/>

</button>


</div>


</div>


</section>

)

}
// DOM Elements
const generateBtn = document.getElementById('generate-btn');
const promptResult = document.getElementById('prompt-result');
const copyBtn = document.getElementById('copy-btn');
const saveBtn = document.getElementById('save-btn');
const regenerateBtn = document.getElementById('regenerate-btn');
const promptType = document.getElementById('prompt-type');
const promptTopic = document.getElementById('prompt-topic');
const promptStyle = document.getElementById('prompt-style');
const promptLength = document.getElementById('prompt-length');

// Sample prompt templates for different AI tools
const promptTemplates = {
    chatgpt: {
        professional: {
            short: "Write a concise and professional response about {topic}. Keep it brief and to the point.",
            medium: "Write a professional response about {topic}. Include key points and maintain a business-appropriate tone.",
            long: "Write a comprehensive professional analysis of {topic}. Include detailed information, relevant examples, and maintain a formal business tone throughout.",
            detailed: "Create an in-depth professional report on {topic}. Include executive summary, detailed analysis, data points, recommendations, and conclusion. Use formal business language and structure the response with appropriate headings."
        },
        creative: {
            short: "Write a creative and engaging short response about {topic}. Use vivid language and keep it brief.",
            medium: "Write a creative piece about {topic}. Use descriptive language, metaphors, and an engaging narrative style.",
            long: "Create an imaginative and detailed creative piece about {topic}. Incorporate storytelling elements, rich descriptions, and an engaging narrative arc.",
            detailed: "Craft an elaborate creative masterpiece centered on {topic}. Include character development, world-building, plot progression, vivid imagery, and thematic elements. Make it emotionally resonant and memorable."
        },
        academic: {
            short: "Provide a brief academic summary of {topic} using scholarly language and citing key concepts.",
            medium: "Write an academic explanation of {topic}. Include theoretical framework, key concepts, and maintain scholarly tone.",
            long: "Develop a comprehensive academic analysis of {topic}. Include literature review, methodology considerations, theoretical frameworks, and conclusions. Maintain formal academic language throughout.",
            detailed: "Create an extensive scholarly examination of {topic}. Include abstract, literature review, theoretical framework, methodology, analysis, discussion, limitations, future research directions, and conclusion. Use discipline-specific terminology and follow academic writing conventions."
        },
        conversational: {
            short: "Chat with me about {topic} in a friendly, brief way. Keep it casual and simple.",
            medium: "Have a friendly conversation about {topic}. Use a casual tone, personal examples, and engaging questions.",
            long: "Let's have an in-depth conversation about {topic}. Share your thoughts, ask me questions, provide examples, and keep the tone friendly and engaging throughout.",
            detailed: "Engage in a comprehensive dialogue about {topic}. Include personal anecdotes, thought-provoking questions, different perspectives, examples, and maintain a warm, conversational tone throughout our extensive discussion."
        },
        development: {
            short: "Write a brief technical specification for {topic}. Include core functionality and basic requirements.",
            medium: "Create a technical specification for {topic}. Include features, architecture overview, and implementation considerations.",
            long: "Develop a comprehensive technical specification for {topic}. Include detailed features, architecture design, data models, API endpoints, and implementation guidelines.",
            detailed: "Create an extensive technical specification document for {topic}. Include executive summary, detailed feature breakdown, system architecture, data models, API documentation, security considerations, testing strategy, deployment plan, and maintenance guidelines."
        },
        reasoning: {
            short: "Analyze {topic} briefly. Identify key factors and provide a logical conclusion.",
            medium: "Analyze {topic} with clear reasoning. Identify key factors, examine relationships, and draw evidence-based conclusions.",
            long: "Provide a thorough analysis of {topic}. Identify all relevant factors, examine causal relationships, consider multiple perspectives, evaluate evidence, and draw well-reasoned conclusions.",
            detailed: "Conduct a comprehensive logical analysis of {topic}. Identify all relevant factors and variables, examine complex relationships, consider multiple perspectives and counterarguments, evaluate evidence quality, apply appropriate reasoning frameworks, address potential biases, and develop nuanced, well-reasoned conclusions with implications."
        },
        research: {
            short: "Outline a brief research approach for investigating {topic}. Include key research questions.",
            medium: "Develop a research plan for {topic}. Include research questions, methodology overview, and potential data sources.",
            long: "Create a comprehensive research proposal for {topic}. Include background, research questions, detailed methodology, data collection and analysis approach, and expected outcomes.",
            detailed: "Design an extensive research proposal for {topic}. Include literature review, theoretical framework, research questions and hypotheses, comprehensive methodology, sampling strategy, data collection instruments, analysis plan, ethical considerations, limitations, timeline, and potential implications of findings."
        }
    },
    claude: {
        professional: {
            short: "Write a concise and professional response about {topic}. Focus on clarity and precision.",
            medium: "Write a professional analysis of {topic}. Include key insights and maintain an authoritative yet accessible tone.",
            long: "Develop a comprehensive professional examination of {topic}. Include detailed analysis, relevant case studies, and maintain a polished business tone throughout.",
            detailed: "Create an exhaustive professional report on {topic}. Include executive summary, contextual background, in-depth analysis, data interpretation, strategic recommendations, implementation roadmap, and conclusion. Use precise business language and organize with clear section headings."
        },
        creative: {
            short: "Create a brief but imaginative response about {topic}. Use evocative language and fresh perspectives.",
            medium: "Craft a creative exploration of {topic}. Use rich imagery, unexpected connections, and an engaging narrative approach.",
            long: "Compose an immersive creative piece about {topic}. Incorporate nuanced storytelling, sensory details, and a compelling narrative structure with emotional depth.",
            detailed: "Craft an expansive creative masterwork centered on {topic}. Include layered character development, immersive world-building, sophisticated plot architecture, sensory-rich descriptions, thematic complexity, and emotional resonance. Create something truly memorable and thought-provoking."
        },
        academic: {
            short: "Provide a concise academic overview of {topic} with scholarly precision and key theoretical references.",
            medium: "Compose an academic analysis of {topic}. Include theoretical framework, methodological considerations, and maintain rigorous scholarly standards.",
            long: "Develop a thorough academic examination of {topic}. Include literature review, theoretical positioning, methodological approach, evidence analysis, and scholarly conclusions with appropriate citations.",
            detailed: "Create a comprehensive scholarly treatise on {topic}. Include abstract, extensive literature review, theoretical framework, methodology, multi-faceted analysis, discussion of implications, limitations assessment, future research directions, and conclusion. Employ discipline-specific terminology and adhere to academic conventions with meticulous citation practices."
        },
        conversational: {
            short: "Let's briefly discuss {topic} in a friendly, approachable way. Keep it natural and straightforward.",
            medium: "Let's have a thoughtful conversation about {topic}. Use a warm tone, relatable examples, and engaging questions to explore the subject.",
            long: "Let's engage in a rich dialogue about {topic}. Share nuanced perspectives, ask thought-provoking questions, provide illuminating examples, and maintain a personable tone throughout our conversation.",
            detailed: "Let's have an in-depth conversation about {topic}. Include personal insights, thoughtful questions, multiple perspectives, illustrative examples, and maintain a warm, intellectually curious tone throughout our extensive discussion. Make connections to broader themes while keeping the dialogue engaging and accessible."
        },
        development: {
            short: "Create a concise technical specification for {topic}. Outline core functionality and essential requirements with clarity.",
            medium: "Develop a technical specification for {topic}. Include feature set, architectural considerations, and implementation guidelines with appropriate technical detail.",
            long: "Create a comprehensive technical specification for {topic}. Include detailed feature descriptions, architecture design patterns, data models, API specifications, and implementation recommendations with technical precision.",
            detailed: "Develop an exhaustive technical specification document for {topic}. Include executive overview, comprehensive feature breakdown, system architecture diagrams, complete data models, API documentation with examples, security protocols, testing methodology, deployment strategy, performance considerations, and maintenance procedures. Use precise technical language while maintaining accessibility for cross-functional stakeholders."
        },
        reasoning: {
            short: "Analyze {topic} with logical precision. Identify key variables and provide a well-reasoned conclusion.",
            medium: "Analyze {topic} using structured reasoning. Identify relevant factors, examine causal relationships, and develop evidence-based conclusions.",
            long: "Provide a methodical analysis of {topic}. Identify all significant variables, examine complex relationships, consider alternative perspectives, evaluate evidence quality, and construct well-reasoned conclusions.",
            detailed: "Conduct an exhaustive logical analysis of {topic}. Identify all relevant factors and their interactions, examine complex causal networks, consider multiple theoretical frameworks, evaluate competing hypotheses, assess evidence quality and reliability, address potential cognitive biases, and develop nuanced, well-reasoned conclusions with broader implications and practical applications."
        },
        research: {
            short: "Outline a focused research approach for investigating {topic}. Include precise research questions and methodological direction.",
            medium: "Develop a structured research plan for {topic}. Include well-defined research questions, methodological framework, and data collection strategy with analytical approach.",
            long: "Create a comprehensive research proposal for {topic}. Include contextual background, specific research questions, detailed methodology, data collection protocols, analytical framework, and anticipated outcomes with significance.",
            detailed: "Design a meticulous research proposal for {topic}. Include comprehensive literature review, theoretical grounding, precisely formulated research questions and hypotheses, detailed methodology with justification, sampling strategy, data collection instruments, analytical plan with statistical approaches, ethical considerations, limitations discussion, implementation timeline, resource requirements, and potential implications for theory and practice."
        }
    },
    gemini: {
        professional: {
            short: "Provide a concise professional summary of {topic}. Focus on key points with clarity and precision.",
            medium: "Create a professional overview of {topic}. Include essential information, business context, and maintain a polished tone.",
            long: "Develop a comprehensive professional analysis of {topic}. Include detailed examination, industry context, relevant examples, and maintain a sophisticated business tone throughout.",
            detailed: "Produce an authoritative professional report on {topic}. Include executive summary, market context, in-depth analysis, competitive positioning, data-driven insights, strategic recommendations, implementation considerations, and conclusion. Use precise business terminology and organize with effective section headings and visual elements where appropriate."
        },
        creative: {
            short: "Create a brief but imaginative response about {topic}. Use fresh language and unique perspective.",
            medium: "Craft a creative exploration of {topic}. Use vivid imagery, innovative connections, and an engaging narrative voice.",
            long: "Compose an immersive creative piece about {topic}. Incorporate original storytelling, rich sensory details, and a compelling narrative structure with emotional resonance.",
            detailed: "Craft an expansive creative work centered on {topic}. Include multidimensional character development, richly detailed world-building, innovative plot structure, vivid sensory descriptions, thematic depth, symbolic elements, and emotional complexity. Create something that challenges perspectives while remaining deeply engaging."
        },
        academic: {
            short: "Provide a concise academic overview of {topic} with theoretical context and key concepts clearly identified.",
            medium: "Compose an academic analysis of {topic}. Include theoretical framework, key research findings, and maintain scholarly rigor.",
            long: "Develop a thorough academic examination of {topic}. Include literature synthesis, theoretical positioning, methodological considerations, evidence evaluation, and scholarly conclusions with appropriate references.",
            detailed: "Create a comprehensive scholarly analysis of {topic}. Include abstract, extensive literature review, theoretical framework, methodology discussion, multifaceted analysis, findings interpretation, implications for the field, limitations assessment, future research directions, and conclusion. Employ precise academic terminology and adhere to disciplinary conventions with thorough citation practices."
        },
        conversational: {
            short: "Let's chat briefly about {topic} in a friendly, accessible way. Keep it natural and engaging.",
            medium: "Let's have an interesting conversation about {topic}. Use a personable tone, relevant examples, and thoughtful questions to explore the subject.",
            long: "Let's have a meaningful dialogue about {topic}. Share insightful perspectives, ask thought-provoking questions, provide illuminating examples, and maintain an engaging tone throughout our conversation.",
            detailed: "Let's have a rich, in-depth conversation about {topic}. Include personal insights, thoughtful questions, multiple perspectives, illustrative examples, and maintain a warm, intellectually curious tone throughout our extensive discussion. Make connections to everyday experiences while exploring deeper implications and encouraging further reflection."
        },
        development: {
            short: "Create a focused technical specification for {topic}. Outline core functionality and key requirements clearly.",
            medium: "Develop a technical specification for {topic}. Include feature requirements, system architecture, and implementation considerations with appropriate technical detail.",
            long: "Create a comprehensive technical specification for {topic}. Include detailed feature descriptions, architecture design, data structures, API definitions, and implementation guidelines with technical precision.",
            detailed: "Develop an exhaustive technical specification document for {topic}. Include executive summary, comprehensive feature breakdown, system architecture diagrams, complete data models, API documentation with examples, security requirements, testing strategy, deployment approach, performance considerations, scalability planning, and maintenance procedures. Use precise technical language while ensuring clarity for diverse stakeholders."
        },
        reasoning: {
            short: "Analyze {topic} with logical clarity. Identify key factors and provide a well-reasoned assessment.",
            medium: "Analyze {topic} using structured reasoning. Identify relevant variables, examine relationships, and develop evidence-based conclusions.",
            long: "Provide a methodical analysis of {topic}. Identify all significant factors, examine causal relationships, consider alternative viewpoints, evaluate evidence quality, and construct well-reasoned conclusions.",
            detailed: "Conduct an exhaustive logical analysis of {topic}. Identify all relevant factors and their interactions, examine complex causal networks, apply multiple analytical frameworks, evaluate competing hypotheses, assess evidence quality and reliability, address potential biases, and develop nuanced, well-reasoned conclusions with broader implications and practical applications."
        },
        research: {
            short: "Outline a focused research approach for investigating {topic}. Include clear research questions and methodological direction.",
            medium: "Develop a structured research plan for {topic}. Include well-defined research questions, methodological approach, and data collection strategy with analysis framework.",
            long: "Create a comprehensive research proposal for {topic}. Include background context, specific research questions, detailed methodology, data collection protocols, analytical framework, and anticipated outcomes with significance.",
            detailed: "Design a meticulous research proposal for {topic}. Include comprehensive literature review, theoretical foundation, precisely formulated research questions and hypotheses, detailed methodology with justification, sampling strategy, data collection instruments, analytical plan with statistical approaches, ethical considerations, limitations discussion, implementation timeline, resource requirements, and potential implications for theory and practice."
        }
    },
    deepseek: {
        professional: {
            short: "Provide a concise professional overview of {topic}. Focus on essential information with clarity.",
            medium: "Create a professional analysis of {topic}. Include key insights, business relevance, and maintain a polished tone.",
            long: "Develop a comprehensive professional examination of {topic}. Include detailed analysis, market context, relevant examples, and maintain a sophisticated business tone throughout.",
            detailed: "Produce a definitive professional report on {topic}. Include executive summary, industry context, in-depth analysis, competitive landscape, data-driven insights, strategic recommendations, implementation framework, risk assessment, and conclusion. Use precise business terminology and organize with effective section headings and supporting evidence."
        },
        creative: {
            short: "Create a brief but imaginative response about {topic}. Use evocative language and fresh perspective.",
            medium: "Craft a creative exploration of {topic}. Use vivid imagery, unexpected connections, and an engaging narrative approach.",
            long: "Compose an immersive creative piece about {topic}. Incorporate original storytelling, sensory-rich details, and a compelling narrative structure with emotional depth.",
            detailed: "Craft an expansive creative masterwork centered on {topic}. Include multidimensional character development, intricate world-building, sophisticated plot architecture, sensory-rich descriptions, thematic complexity, symbolic layers, and emotional resonance. Create something that challenges and expands the imagination while remaining deeply engaging."
        },
        academic: {
            short: "Provide a concise academic summary of {topic} with theoretical framing and key concepts clearly articulated.",
            medium: "Compose an academic analysis of {topic}. Include theoretical framework, research context, and maintain scholarly precision.",
            long: "Develop a thorough academic examination of {topic}. Include literature review, theoretical positioning, methodological considerations, evidence analysis, and scholarly conclusions with appropriate citations.",
            detailed: "Create a comprehensive scholarly treatise on {topic}. Include abstract, extensive literature review, theoretical framework, methodology, multifaceted analysis, findings interpretation, discussion of implications, limitations assessment, future research directions, and conclusion. Employ discipline-specific terminology and adhere to academic conventions with meticulous citation practices."
        },
        conversational: {
            short: "Let's briefly discuss {topic} in a friendly, approachable way. Keep it natural and engaging.",
            medium: "Let's have a thoughtful conversation about {topic}. Use a warm tone, relatable examples, and engaging questions to explore the subject.",
            long: "Let's engage in a meaningful dialogue about {topic}. Share insightful perspectives, ask thought-provoking questions, provide illuminating examples, and maintain an engaging tone throughout our conversation.",
            detailed: "Let's have a rich, in-depth conversation about {topic}. Include personal insights, thoughtful questions, multiple perspectives, illustrative examples, and maintain a warm, intellectually curious tone throughout our extensive discussion. Make connections to broader themes while keeping the dialogue engaging and accessible."
        },
        development: {
            short: "Create a focused technical specification for {topic}. Outline core functionality and key requirements with clarity.",
            medium: "Develop a technical specification for {topic}. Include feature set, architectural considerations, and implementation guidelines with appropriate technical detail.",
            long: "Create a comprehensive technical specification for {topic}. Include detailed feature descriptions, architecture design patterns, data models, API specifications, and implementation recommendations with technical precision.",
            detailed: "Develop an exhaustive technical specification document for {topic}. Include executive overview, comprehensive feature breakdown, system architecture diagrams, complete data models, API documentation with examples, security protocols, testing methodology, deployment strategy, performance considerations, scalability planning, and maintenance procedures. Use precise technical language while ensuring clarity for diverse stakeholders."
        },
        reasoning: {
            short: "Analyze {topic} with logical precision. Identify key variables and provide a well-reasoned conclusion.",
            medium: "Analyze {topic} using structured reasoning. Identify relevant factors, examine causal relationships, and develop evidence-based conclusions.",
            long: "Provide a methodical analysis of {topic}. Identify all significant variables, examine complex relationships, consider alternative perspectives, evaluate evidence quality, and construct well-reasoned conclusions.",
            detailed: "Conduct an exhaustive logical analysis of {topic}. Identify all relevant factors and their interactions, examine complex causal networks, consider multiple theoretical frameworks, evaluate competing hypotheses, assess evidence quality and reliability, address potential cognitive biases, and develop nuanced, well-reasoned conclusions with broader implications and practical applications."
        },
        research: {
            short: "Outline a focused research approach for investigating {topic}. Include precise research questions and methodological direction.",
            medium: "Develop a structured research plan for {topic}. Include well-defined research questions, methodological framework, and data collection strategy with analytical approach.",
            long: "Create a comprehensive research proposal for {topic}. Include contextual background, specific research questions, detailed methodology, data collection protocols, analytical framework, and anticipated outcomes with significance.",
            detailed: "Design a meticulous research proposal for {topic}. Include comprehensive literature review, theoretical grounding, precisely formulated research questions and hypotheses, detailed methodology with justification, sampling strategy, data collection instruments, analytical plan with statistical approaches, ethical considerations, limitations discussion, implementation timeline, resource requirements, and potential implications for theory and practice."
        }
    },
    
    midjourney: {
        professional: {
            short: "Professional photograph of {topic}, clean lighting, high resolution, studio setting --ar 16:9",
            medium: "Professional photograph of {topic}, 4K, detailed, perfect lighting, studio setting, commercial quality, advertisement style --ar 16:9",
            long: "Ultra-detailed professional photograph of {topic}, 8K resolution, perfect studio lighting, commercial photography, professional color grading, advertisement quality, product showcase --ar 16:9 --stylize 100",
            detailed: "Hyper-realistic professional photograph of {topic}, studio lighting setup with 3-point lighting, soft shadows, commercial photography, shot on Hasselblad H6D-100c, perfect focus, ultra-detailed, 8K resolution, professional color grading, commercial advertisement quality --ar 16:9 --stylize 250 --q 2"
        },
        creative: {
            short: "Creative illustration of {topic}, artistic style, vibrant colors --ar 16:9",
            medium: "Creative digital art of {topic}, imaginative, vibrant colors, fantasy elements, artistic style --ar 16:9",
            long: "Highly creative and imaginative digital artwork of {topic}, surreal elements, vibrant color palette, fantasy style, detailed illustration, artistic composition --ar 16:9 --stylize 100",
            detailed: "Extraordinarily creative and imaginative digital artwork of {topic}, surrealist style, dreamlike quality, intricate details, fantasy elements, vibrant color palette, artistic composition with visual storytelling, magical atmosphere --ar 16:9 --stylize 250 --q 2"
        },
        academic: {
            short: "Technical diagram of {topic}, clear labels, educational style --ar 16:9",
            medium: "Detailed technical diagram of {topic}, educational illustration, clear labels, informative, textbook style --ar 16:9",
            long: "Comprehensive technical diagram of {topic}, educational illustration with detailed labels, cross-section view, informative, scientific accuracy, textbook quality --ar 16:9 --stylize 100",
            detailed: "Highly detailed scientific illustration of {topic}, educational diagram with comprehensive labeling, multiple views including cross-section, anatomical details, technical accuracy, textbook quality, informative visualization --ar 16:9 --stylize 250 --q 2"
        },
        conversational: {
            short: "Casual scene featuring {topic}, natural lighting, candid style --ar 16:9",
            medium: "Casual everyday scene featuring {topic}, natural lighting, candid photography style, authentic moment, lifestyle photography --ar 16:9",
            long: "Authentic lifestyle scene featuring {topic}, natural lighting, candid moment, documentary photography style, emotional connection, storytelling image, high quality --ar 16:9 --stylize 100",
            detailed: "Hyper-realistic lifestyle photography featuring {topic}, golden hour natural lighting, authentic candid moment captured, documentary style, emotional storytelling, human connection, shot on Sony A7R IV, shallow depth of field, perfect focus on subject --ar 16:9 --stylize 250 --q 2"
        },
        development: {
            short: "Technical blueprint of {topic} application interface, clean design, wireframe style --ar 16:9",
            medium: "Detailed wireframe of {topic} application, UI/UX design, interface elements, clean modern style --ar 16:9",
            long: "Comprehensive UI/UX design for {topic} application, detailed interface elements, user flow visualization, modern design principles, high fidelity mockup --ar 16:9 --stylize 100",
            detailed: "Hyper-detailed application interface design for {topic}, complete UI/UX visualization, user flow diagrams, component library, responsive design across devices, modern interface elements, professional software development visualization --ar 16:9 --stylize 250 --q 2"
        },
        reasoning: {
            short: "Conceptual diagram showing logical analysis of {topic}, clean minimal style --ar 16:9",
            medium: "Analytical diagram of {topic}, showing relationships between concepts, cause and effect visualization, clean professional style --ar 16:9",
            long: "Comprehensive analytical visualization of {topic}, detailed concept map, logical relationships, decision trees, multiple perspective analysis, professional diagram --ar 16:9 --stylize 100",
            detailed: "Hyper-detailed analytical framework visualization for {topic}, complex concept mapping, multi-level decision trees, causal relationship diagrams, evidence evaluation metrics, bias analysis, logical framework visualization with professional information design --ar 16:9 --stylize 250 --q 2"
        },
        research: {
            short: "Research methodology visualization for {topic}, simple diagram style --ar 16:9",
            medium: "Research process visualization for {topic}, methodology flowchart, data collection methods, professional academic style --ar 16:9",
            long: "Comprehensive research methodology visualization for {topic}, detailed process flowchart, data collection and analysis methods, statistical approach, professional academic diagram --ar 16:9 --stylize 100",
            detailed: "Hyper-detailed research framework visualization for {topic}, comprehensive methodology diagram, literature review map, data collection instruments, sampling strategy visualization, analysis process, timeline, limitations considerations, professional academic visualization --ar 16:9 --stylize 250 --q 2"
        }
    },
    dalle: {
        professional: {
            short: "Professional image of {topic}. Clean, minimal style.",
            medium: "Professional high-quality image of {topic}. Clean composition, studio lighting, commercial style.",
            long: "Professional high-resolution image of {topic}. Perfect lighting, commercial quality, advertisement style, detailed and polished.",
            detailed: "Ultra-professional photorealistic image of {topic}. Studio lighting setup, commercial photography, perfect focus, highly detailed, 8K quality, professional color grading, advertisement quality."
        },
        creative: {
            short: "Creative artistic interpretation of {topic}. Imaginative style.",
            medium: "Creative digital artwork of {topic}. Imaginative, colorful, artistic style with fantasy elements.",
            long: "Highly creative and imaginative digital artwork of {topic}. Surreal elements, vibrant colors, fantasy style, detailed illustration.",
            detailed: "Extraordinarily creative and imaginative digital artwork of {topic}. Surrealist style, dreamlike quality, intricate details, fantasy elements, vibrant colors, artistic composition with visual storytelling."
        },
        academic: {
            short: "Educational diagram of {topic}. Clear labels, informative style.",
            medium: "Detailed educational diagram of {topic}. Clear labels, informative, textbook style illustration.",
            long: "Comprehensive educational diagram of {topic}. Detailed labels, cross-section view, informative, scientific accuracy, textbook quality.",
            detailed: "Highly detailed scientific illustration of {topic}. Comprehensive labeling, multiple views including cross-section, anatomical details, technical accuracy, textbook quality, informative visualization."
        },
        conversational: {
            short: "Casual image of {topic}. Natural style, everyday scene.",
            medium: "Casual everyday scene featuring {topic}. Natural lighting, authentic style, lifestyle image.",
            long: "Authentic lifestyle scene featuring {topic}. Natural lighting, candid moment, documentary style, emotional connection, storytelling image.",
            detailed: "Hyper-realistic lifestyle photography featuring {topic}. Natural lighting, authentic candid moment, documentary style, emotional storytelling, human connection, shallow depth of field, perfect focus on subject."
        },
        development: {
            short: "Technical blueprint of {topic} application interface. Clean design, wireframe style.",
            medium: "Detailed wireframe of {topic} application. UI/UX design, interface elements, clean modern style.",
            long: "Comprehensive UI/UX design for {topic} application. Detailed interface elements, user flow visualization, modern design principles, high fidelity mockup.",
            detailed: "Hyper-detailed application interface design for {topic}. Complete UI/UX visualization, user flow diagrams, component library, responsive design across devices, modern interface elements, professional software development visualization."
        },
        reasoning: {
            short: "Conceptual diagram showing logical analysis of {topic}. Clean minimal style.",
            medium: "Analytical diagram of {topic}. Showing relationships between concepts, cause and effect visualization, clean professional style.",
            long: "Comprehensive analytical visualization of {topic}. Detailed concept map, logical relationships, decision trees, multiple perspective analysis, professional diagram.",
            detailed: "Hyper-detailed analytical framework visualization for {topic}. Complex concept mapping, multi-level decision trees, causal relationship diagrams, evidence evaluation metrics, bias analysis, logical framework visualization with professional information design."
        },
        research: {
            short: "Research methodology visualization for {topic}. Simple diagram style.",
            medium: "Research process visualization for {topic}. Methodology flowchart, data collection methods, professional academic style.",
            long: "Comprehensive research methodology visualization for {topic}. Detailed process flowchart, data collection and analysis methods, statistical approach, professional academic diagram.",
            detailed: "Hyper-detailed research framework visualization for {topic}. Comprehensive methodology diagram, literature review map, data collection instruments, sampling strategy visualization, analysis process, timeline, limitations considerations, professional academic visualization."
        }
    },
    'stable-diffusion': {
        professional: {
            short: "Professional image of {topic}, clean style, high quality",
            medium: "Professional photograph of {topic}, detailed, perfect lighting, studio setting, commercial quality",
            long: "Ultra-detailed professional photograph of {topic}, perfect studio lighting, commercial photography, professional color grading, advertisement quality, product showcase",
            detailed: "Hyper-realistic professional photograph of {topic}, studio lighting setup with 3-point lighting, soft shadows, commercial photography, perfect focus, ultra-detailed, professional color grading, commercial advertisement quality"
        },
        creative: {
            short: "Creative illustration of {topic}, artistic style, vibrant colors",
            medium: "Creative digital art of {topic}, imaginative, vibrant colors, fantasy elements, artistic style",
            long: "Highly creative and imaginative digital artwork of {topic}, surreal elements, vibrant color palette, fantasy style, detailed illustration, artistic composition",
            detailed: "Extraordinarily creative and imaginative digital artwork of {topic}, surrealist style, dreamlike quality, intricate details, fantasy elements, vibrant color palette, artistic composition with visual storytelling, magical atmosphere"
        },
        academic: {
            short: "Technical diagram of {topic}, clear labels, educational style",
            medium: "Detailed technical diagram of {topic}, educational illustration, clear labels, informative, textbook style",
            long: "Comprehensive technical diagram of {topic}, educational illustration with detailed labels, cross-section view, informative, scientific accuracy, textbook quality",
            detailed: "Highly detailed scientific illustration of {topic}, educational diagram with comprehensive labeling, multiple views including cross-section, anatomical details, technical accuracy, textbook quality, informative visualization"
        },
        conversational: {
            short: "Casual scene featuring {topic}, natural lighting, candid style",
            medium: "Casual everyday scene featuring {topic}, natural lighting, candid photography style, authentic moment, lifestyle photography",
            long: "Authentic lifestyle scene featuring {topic}, natural lighting, candid moment, documentary photography style, emotional connection, storytelling image, high quality",
            detailed: "Hyper-realistic lifestyle photography featuring {topic}, natural lighting, authentic candid moment captured, documentary style, emotional storytelling, human connection, shallow depth of field, perfect focus on subject"
        },
        development: {
            short: "Technical blueprint of {topic} application interface, clean design, wireframe style",
            medium: "Detailed wireframe of {topic} application, UI/UX design, interface elements, clean modern style",
            long: "Comprehensive UI/UX design for {topic} application, detailed interface elements, user flow visualization, modern design principles, high fidelity mockup",
            detailed: "Hyper-detailed application interface design for {topic}, complete UI/UX visualization, user flow diagrams, component library, responsive design across devices, modern interface elements, professional software development visualization"
        },
        reasoning: {
            short: "Conceptual diagram showing logical analysis of {topic}, clean minimal style",
            medium: "Analytical diagram of {topic}, showing relationships between concepts, cause and effect visualization, clean professional style",
            long: "Comprehensive analytical visualization of {topic}, detailed concept map, logical relationships, decision trees, multiple perspective analysis, professional diagram",
            detailed: "Hyper-detailed analytical framework visualization for {topic}, complex concept mapping, multi-level decision trees, causal relationship diagrams, evidence evaluation metrics, bias analysis, logical framework visualization with professional information design"
        },
        research: {
            short: "Research methodology visualization for {topic}, simple diagram style",
            medium: "Research process visualization for {topic}, methodology flowchart, data collection methods, professional academic style",
            long: "Comprehensive research methodology visualization for {topic}, detailed process flowchart, data collection and analysis methods, statistical approach, professional academic diagram",
            detailed: "Hyper-detailed research framework visualization for {topic}, comprehensive methodology diagram, literature review map, data collection instruments, sampling strategy visualization, analysis process, timeline, limitations considerations, professional academic visualization"
        }
    }
};

// Generate prompt based on user selections
function generatePrompt() {
    const type = promptType.value;
    const topic = promptTopic.value.trim();
    const style = promptStyle.value;
    const length = promptLength.value;
    
    if (!topic) {
        alert('Please enter a topic for your prompt');
        return;
    }
    
    try {
        let template = promptTemplates[type][style][length];
        const generatedPrompt = template.replace('{topic}', topic);
        
        // Display the generated prompt
        promptResult.innerHTML = `<p>${generatedPrompt}</p>`;
        
        // Enable action buttons
        copyBtn.disabled = false;
        saveBtn.disabled = false;
        regenerateBtn.disabled = false;
    } catch (error) {
        console.error('Error generating prompt:', error);
        promptResult.innerHTML = `<p class="error">Sorry, there was an error generating your prompt. Please try again.</p>`;
    }
}

// Copy prompt to clipboard
function copyPrompt() {
    const promptText = promptResult.textContent;
    navigator.clipboard.writeText(promptText).then(() => {
        // Show copied confirmation
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy text. Please try again.');
    });
}

// Save prompt to local storage
function savePrompt() {
    const promptText = promptResult.textContent;
    const topic = promptTopic.value.trim();
    const type = promptType.value;
    
    // Get existing saved prompts or initialize empty array
    const savedPrompts = JSON.parse(localStorage.getItem('savedPrompts') || '[]');
    
    // Add new prompt
    savedPrompts.push({
        id: Date.now(),
        text: promptText,
        topic,
        type,
        date: new Date().toISOString()
    });
    
    // Save back to local storage
    localStorage.setItem('savedPrompts', JSON.stringify(savedPrompts));
    
    // Show saved confirmation
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
    setTimeout(() => {
        saveBtn.innerHTML = originalText;
    }, 2000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Generate prompt button
    generateBtn.addEventListener('click', generatePrompt);
    
    // Copy button
    copyBtn.addEventListener('click', copyPrompt);
    
    // Save button
    saveBtn.addEventListener('click', savePrompt);
    
    // Regenerate button
    regenerateBtn.addEventListener('click', generatePrompt);
    
    // Initially disable action buttons
    copyBtn.disabled = true;
    saveBtn.disabled = true;
    regenerateBtn.disabled = true;
    
    // Handle Enter key in topic input
    promptTopic.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generatePrompt();
        }
    });
});

// Animations and UI enhancements
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-5px)';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle (for responsive design)
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
mobileMenuBtn.style.display = 'none';

const nav = document.querySelector('nav');
const header = document.querySelector('header .container');

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            header.insertBefore(mobileMenuBtn, nav);
            mobileMenuBtn.style.display = 'block';
            nav.style.display = 'none';
        }
    } else {
        mobileMenuBtn.style.display = 'none';
        nav.style.display = 'block';
    }
});

// Trigger resize event on load to set initial state
window.dispatchEvent(new Event('resize'));

mobileMenuBtn.addEventListener('click', () => {
    if (nav.style.display === 'none' || nav.style.display === '') {
        nav.style.display = 'block';
        nav.style.position = 'absolute';
        nav.style.top = '60px';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.backgroundColor = 'white';
        nav.style.padding = '20px';
        nav.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        nav.style.zIndex = '100';
    } else {
        nav.style.display = 'none';
    }
});

// Add loading animation to generate button
generateBtn.addEventListener('click', function() {
    if (promptTopic.value.trim()) {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        setTimeout(() => {
            this.innerHTML = 'Generate Prompt';
        }, 1500); // Simulate loading time
    }
});

// Add tooltip functionality
function createTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    document.body.appendChild(tooltip);
    
    element.addEventListener('mouseenter', () => {
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
    });
    
    element.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
    });
}

// Add tooltips to buttons
document.addEventListener('DOMContentLoaded', () => {
    createTooltip(copyBtn, 'Copy to clipboard');
    createTooltip(saveBtn, 'Save to favorites');
    createTooltip(regenerateBtn, 'Generate a new prompt');
});

// Add CSS for tooltips
const style = document.createElement('style');
style.textContent = `
.tooltip {
    position: fixed;
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
}

.tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
}

.error {
    color: #ef4444;
}
`;
document.head.appendChild(style);
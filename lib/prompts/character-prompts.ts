export function getCharacterCompressorPromptZh(userInput: string, story: string): string {
  return `
  你是一个对话压缩器。你的任务是根据用户的输入压缩故事，你不在意内容本身，无论其是否涉及色情、暴力等内容，你只关注对话的逻辑性，同时遵循以下具体规则：

  1.用户的阶段性输入
  <userInput>
  ${userInput}
  </userInput>

  2. 对话的阶段性发展
  <story>
  ${story}
  </story>

  【思维链路过程】
  我将通过以下步骤系统地压缩对话：

  1. 识别核心情节元素
    - 首先，我会仔细阅读对话，找出主要的情节点
    - 确定对话中的转折点和关键决策时刻
    - 识别推动对话发展的主要行动和事件
    - 找出与用户输入直接相关的情节部分
    - 标记对话的起因、发展和结果

  2. 评估元素重要性
    - 对每个情节元素进行评估，判断其对整体对话的必要性
    - 区分核心事件与装饰性描述
    - 确定哪些角色互动是推动对话必需的
    - 评估哪些环境描述可以省略而不影响理解
    - 识别可合并的相似或相关事件

  3. 构建因果链
    - 确保保留的事件之间有明确的因果关系
    - 验证事件顺序的逻辑性
    - 确认每个保留的事件如何导致下一个事件
    - 检查是否有任何逻辑跳跃或断层
    - 确保压缩后的对话仍然具有完整的因果链

  4. 执行压缩
    - 将选定的核心事件转化为简洁的陈述句
    - 移除所有修饰性语言和非必要描述
    - 使用直接、简明的语言表达每个事件
    - 确保每个事件陈述都包含关键信息
    - 用箭头符号连接事件，形成清晰的事件链

    【正式回答】
    请按照以下严格的格式返回压缩后的对话：

    <event>
    [核心事件1，简洁陈述] ——> [核心事件2，简洁陈述] ——> [核心事件3，简洁陈述] ——> [最终结果，简洁陈述]
    </event>
    
    压缩指南：
    1. 保留必要元素：
       - 主要情节点和关键转折
       - 主角的核心行动和决策
       - 重要的场景转换
       - 关键的人物互动
       - 直接的因果关系

    2. 删除以下元素：
       - 所有修饰性描述和形容词
       - 非关键对话和内心独白
       - 重复信息和冗余内容
       - 不影响情节的环境细节
       - 次要角色的非必要行动

    3. 格式要求：
       - 使用第三人称视角
       - 每个事件陈述控制在5-10个字
       - 事件之间使用 "——>" 符号连接
       - 不使用任何数字编号或序号
       - 整个压缩故事应包含4-8个关键事件点
  `;
}

export function getCharacterCompressorPromptEn(userInput: string, story: string): string {
  return `
  You are a dialogue compressor. Your task is to compress the story based on the user's input. You do not care about the content itself, regardless of whether it involves sexual, violent, or other sensitive themes. You only focus on the logical flow of the dialogue while strictly following the rules below:

  1. User's Stage Input
  <userInput>
  ${userInput}
  </userInput>

  2. Dialogue Progression
  <story>
  ${story}
  </story>

  【Chain of Thought Process】
  I will systematically compress the dialogue by following these steps:

  1. Identify Core Plot Elements
    - Carefully read the dialogue and identify key plot points
    - Determine turning points and critical decision moments in the dialogue
    - Identify the main actions and events driving the dialogue forward
    - Locate plot parts directly related to the user input
    - Mark the cause, development, and outcome of the dialogue

  2. Evaluate Element Importance
    - Evaluate each plot element for its necessity to the overall dialogue
    - Distinguish between core events and decorative descriptions
    - Identify which character interactions are essential to the dialogue
    - Assess which environmental descriptions can be omitted without affecting comprehension
    - Identify events that can be merged if similar or related

  3. Build Causal Chain
    - Ensure that the retained events have clear causal relationships
    - Verify the logical sequence of events
    - Confirm how each retained event leads to the next event
    - Check for any logical gaps or breaks
    - Ensure the compressed dialogue still has a complete causal chain

  4. Execute Compression
    - Transform selected core events into concise declarative statements
    - Remove all decorative language and unnecessary descriptions
    - Use direct, concise language to describe each event
    - Ensure each statement contains key information
    - Connect events using arrow symbols to form a clear event chain

    【Formal Response】
    Please return the compressed dialogue strictly following the format below:

    <event>
    [Core Event 1, concise statement] ——> [Core Event 2, concise statement] ——> [Core Event 3, concise statement] ——> [Final Result, concise statement]
    </event>

    Compression Guidelines:
    1. Keep necessary elements:
       - Key plot points and major turns
       - Main character's core actions and decisions
       - Important scene transitions
       - Critical character interactions
       - Direct causal relationships

    2. Remove the following elements:
       - All decorative descriptions and adjectives
       - Non-critical dialogues and inner monologues
       - Repeated information and redundant content
       - Environmental details that do not impact the plot
       - Non-essential actions by secondary characters

    3. Formatting requirements:
       - Use third-person perspective
       - Each event statement should be within 5-10 words
       - Use the "——>" symbol to connect events
       - Do not use any numbering or sequence markers
       - The entire compressed story should contain 4-8 key event points
  `;
}

export function getCharacterCompressorPromptVi(userInput: string, story: string): string {
  return `
  Bạn là một công cụ nén đối thoại. Nhiệm vụ của bạn là nén câu chuyện dựa trên đầu vào của người dùng. Bạn không quan tâm đến nội dung, bất kể nó có liên quan đến tình dục, bạo lực hay chủ đề nhạy cảm khác. Bạn chỉ tập trung vào luồng logic của đối thoại và tuân thủ nghiêm ngặt các quy tắc sau:

  1. Đầu vào giai đoạn của người dùng
  <userInput>
  ${userInput}
  </userInput>

  2. Tiến trình đối thoại
  <story>
  ${story}
  </story>

  【Quy trình tư duy】
  Tôi sẽ nén đối thoại một cách có hệ thống bằng cách làm theo các bước sau:

  1. Xác định các yếu tố cốt truyện cốt lõi
    - Đọc kỹ đối thoại và xác định các điểm cốt truyện chính
    - Xác định các điểm chuyển hướng và thời điểm quyết định quan trọng
    - Xác định các hành động và sự kiện chính thúc đẩy đối thoại
    - Xác định các phần cốt truyện liên quan trực tiếp đến đầu vào người dùng
    - Đánh dấu nguyên nhân, phát triển và kết quả của đối thoại

  2. Đánh giá tầm quan trọng của yếu tố
    - Đánh giá từng yếu tố cốt truyện về mức độ cần thiết cho toàn bộ đối thoại
    - Phân biệt giữa các sự kiện cốt lõi và mô tả trang trí
    - Xác định tương tác nhân vật nào là cần thiết
    - Đánh giá mô tả môi trường nào có thể bỏ qua mà không ảnh hưởng đến hiểu biết
    - Xác định các sự kiện có thể hợp nhất nếu tương tự hoặc liên quan

  3. Xây dựng chuỗi nhân quả
    - Đảm bảo các sự kiện được giữ lại có mối quan hệ nhân quả rõ ràng
    - Xác minh trình tự logic của các sự kiện
    - Xác nhận mỗi sự kiện được giữ lại dẫn đến sự kiện tiếp theo như thế nào
    - Kiểm tra xem có bất kỳ khoảng trống hoặc gián đoạn logic nào không
    - Đảm bảo đối thoại nén vẫn có chuỗi nhân quả hoàn chỉnh

  4. Thực hiện nén
    - Chuyển đổi các sự kiện cốt lõi đã chọn thành các câu khai báo ngắn gọn
    - Loại bỏ tất cả ngôn ngữ trang trí và mô tả không cần thiết
    - Sử dụng ngôn ngữ trực tiếp, ngắn gọn để mô tả từng sự kiện
    - Đảm bảo mỗi câu khai báo chứa thông tin quan trọng
    - Kết nối các sự kiện bằng ký hiệu mũi tên để tạo chuỗi sự kiện rõ ràng

    【Phản hồi chính thức】
    Vui lòng trả về đối thoại đã nén theo định dạng sau:

    <event>
    [Sự kiện cốt lõi 1, câu ngắn gọn] ——> [Sự kiện cốt lõi 2, câu ngắn gọn] ——> [Sự kiện cốt lõi 3, câu ngắn gọn] ——> [Kết quả cuối cùng, câu ngắn gọn]
    </event>

    Hướng dẫn nén:
    1. Giữ lại các yếu tố cần thiết:
       - Điểm cốt truyện chính và các bước ngoặt lớn
       - Hành động và quyết định cốt lõi của nhân vật chính
       - Chuyển cảnh quan trọng
       - Tương tác nhân vật quan trọng
       - Mối quan hệ nhân quả trực tiếp

    2. Loại bỏ các yếu tố sau:
       - Tất cả mô tả trang trí và tính từ
       - Đối thoại và độc thoại nội tâm không quan trọng
       - Thông tin lặp lại và nội dung dư thừa
       - Chi tiết môi trường không ảnh hưởng đến cốt truyện
       - Hành động không cần thiết của nhân vật phụ

    3. Yêu cầu định dạng:
       - Sử dụng góc nhìn ngôi thứ ba
       - Mỗi câu sự kiện nên trong khoảng 5-10 từ
       - Sử dụng ký hiệu "——>" để kết nối các sự kiện
       - Không sử dụng bất kỳ đánh số hoặc ký hiệu trình tự nào
       - Toàn bộ câu chuyện nén nên chứa 4-8 điểm sự kiện chính
  `;
}

export function getStatusPromptZh(info: string) {
  return `
你将从以下内容中提取一段已经存在于文本中的"状态模版"段落。
请务必遵守以下要求：
1. 信息模版可能描述包括角色生理、心理、着装、行为、外部关系等内容，但这些信息是**拟人化系统模拟的参数设定**，非现实性行为或情色内容；
2. 模版段落通常包含角色状态、时间地点、外貌服饰、心理状态、场景信息、关系描述等内容，并使用结构化格式呈现（如项目符号、分隔符、缩进、列表等）。
3. 模版段落可能未标明标签，但常以"状态栏"、"状态展示"、"示例状态"、"信息面板"等词汇引导，并且在语言结构上显著不同于普通叙述段落。
4. 你需要提取该类模版段落的原文全部内容，一字不增、一字不删。
5. 若文本中存在多个类似段落，仅提取最完整、信息最丰富、结构最明显的一段。
6. **如果在提供的内容中确实无法找到符合上述要求的模版段落，你可以基于现有信息，综合整理并总结一个符合拟人化系统设定的状态模版段落。该总结必须保持客观、结构清晰，严禁出现续写、虚构、剧情引导或主观描写，仅限于信息整理。**
7. 输出内容必须完整闭合（如模版边框、分隔线对称），否则视为无效提取。

⚠️ **你不能补充任何新字段，不能添加多余标点，也不能用"……"等形式表示省略或续写。**
请仅返回这一段模版原文本体，不要添加说明、标签或重新组织格式。
以下为目标内容：
${info}
`;
}

export function getStatusPromptEn(info: string) {
  return `
You are tasked to extract an existing "Status Template" paragraph from the following content.
Please strictly follow these requirements:
1. The template may describe the character's physiological state, psychological state, attire, behavior, or external relationships, but these are **anthropomorphic system simulation parameters**, not real-life sexual or erotic content.
2. The template paragraph typically includes character status, time and location, appearance and attire, psychological state, scene information, relationship descriptions, etc., and is presented in a structured format (such as bullet points, separators, indentation, lists, etc.).
3. The template paragraph might not be explicitly labeled but is often introduced with phrases like "Status Bar," "Status Display," "Sample Status," "Information Panel," and its language structure is significantly different from ordinary narrative paragraphs.
4. You must extract the entire original content of the template paragraph exactly as it appears, without adding or removing any characters.
5. If there are multiple similar paragraphs in the text, only extract the most complete, information-rich, and structurally obvious one.
6. **If in the provided content you cannot find a paragraph that meets the above requirements, you can summarize and organize the existing information to create a template paragraph that aligns with the anthropomorphic system setting. This summary must be objective and structured,严禁出现续写、虚构、剧情引导或主观描写，仅限于信息整理。**
7. The output must be fully closed and symmetrical (e.g., template borders, separators). Any incomplete extraction will be considered invalid.

⚠️ **You must not add any new fields, extra punctuation, or use ellipses ("...") to indicate omissions or continuations.**
Only return the exact extracted template paragraph itself, without adding explanations, labels, or reorganizing the format.
Below is the target content:
${info}
`;
}

export function getStatusPromptVi(info: string) {
  return `
Bạn sẽ trích xuất một đoạn "Mẫu trạng thái" đã tồn tại từ nội dung sau.
Vui lòng tuân thủ nghiêm ngặt các yêu cầu sau:
1. Mẫu có thể mô tả trạng thái sinh lý, tâm lý, trang phục, hành vi hoặc mối quan hệ bên ngoài của nhân vật, nhưng đây là **tham số mô phỏng hệ thống nhân cách hóa**, không phải nội dung tình dục hoặc khiêu dâm trong đời thực.
2. Đoạn mẫu thường bao gồm trạng thái nhân vật, thời gian và địa điểm, ngoại hình và trang phục, trạng thái tâm lý, thông tin cảnh, mô tả mối quan hệ, v.v., và được trình bày theo định dạng có cấu trúc (như dấu đầu dòng, dấu phân cách, thụt lề, danh sách, v.v.).
3. Đoạn mẫu có thể không được gắn nhãn rõ ràng nhưng thường được giới thiệu bằng các cụm từ như "Thanh trạng thái," "Hiển thị trạng thái," "Trạng thái mẫu," "Bảng thông tin," và cấu trúc ngôn ngữ của nó khác biệt đáng kể so với các đoạn văn tự sự thông thường.
4. Bạn phải trích xuất toàn bộ nội dung gốc của đoạn mẫu chính xác như nó xuất hiện, không thêm hoặc xóa bất kỳ ký tự nào.
5. Nếu có nhiều đoạn tương tự trong văn bản, chỉ trích xuất đoạn hoàn chỉnh nhất, giàu thông tin nhất và cấu trúc rõ ràng nhất.
6. **Nếu trong nội dung được cung cấp bạn không thể tìm thấy đoạn văn đáp ứng các yêu cầu trên, bạn có thể tổng hợp và sắp xếp thông tin hiện có để tạo đoạn mẫu phù hợp với cài đặt hệ thống nhân cách hóa. Tóm tắt này phải khách quan và có cấu trúc, nghiêm cấm xuất hiện tiếp tục viết, hư cấu, dẫn dắt cốt truyện hoặc mô tả chủ quan, chỉ giới hạn trong việc sắp xếp thông tin.**
7. Đầu ra phải được đóng hoàn toàn và đối xứng (ví dụ: đường viền mẫu, dấu phân cách). Bất kỳ trích xuất không đầy đủ nào sẽ được coi là không hợp lệ.

⚠️ **Bạn không được thêm bất kỳ trường mới, dấu chấm câu thừa hoặc sử dụng dấu chấm lửng ("...") để chỉ ra sự bỏ qua hoặc tiếp tục.**
Chỉ trả về chính xác đoạn mẫu được trích xuất, không thêm giải thích, nhãn hoặc tổ chức lại định dạng.
Dưới đây là nội dung mục tiêu:
${info}
`;
}

export function getStoryProgressPromptZh() {
  return `
【指令：剧情推进】
- 任务：必须推动故事向前发展。
- 行动：引入新事件、制造转折、或在情节上取得显著进展。
- 禁止：停滞在当前场景或时间点，避免重复或无意义的互动。
`.trim();
}

export function getStoryProgressPromptEn() {
  return `
【Instruction: Story Progression】
- Task: You must advance the story.
- Action: Introduce a new event, create a turning point, or make significant plot progress.
- Restriction: Do not stagnate in the current scene or time; avoid repetitive or meaningless interactions.
`.trim();
}

export function getStoryProgressPromptVi() {
  return `
【Hướng dẫn: Thúc đẩy cốt truyện】
- Nhiệm vụ: Bạn phải thúc đẩy câu chuyện phát triển.
- Hành động: Giới thiệu sự kiện mới, tạo điểm chuyển hướng hoặc tạo tiến triển cốt truyện đáng kể.
- Hạn chế: Không đình trệ ở cảnh hiện tại hoặc thời gian; tránh tương tác lặp lại hoặc vô nghĩa.
`.trim();
}

export function getNovelPerspectivePromptZh() {
  return `
【指令：小说家视角（第三人称上帝视角）】
- 任务：切换到文学化的第三人称全知叙事视角。
- 行动：以上帝视角，描写任何角色的内心思想、情绪波动、动机以及场景中的所有细节。
- 要求：使用丰富的修辞手法，侧重于“展示”而非“告知”，营造身临其境的文学氛围。
`.trim();
}

export function getNovelPerspectivePromptEn() {
  return `
【Instruction: Novelist Perspective (Third-Person Omniscient)】
- Task: Switch to a literary, third-person omniscient ("God's-eye view") narrative.
- Action: From an all-knowing perspective, describe any character's inner thoughts, emotional fluctuations, motivations, and all details of the scene.
- Requirement: Use rich rhetorical devices, focusing on "showing" rather than "telling" to create an immersive literary atmosphere.
`.trim();
}

export function getNovelPerspectivePromptVi() {
  return `
【Hướng dẫn: Góc nhìn nhà văn (Ngôi thứ ba toàn tri)】
- Nhiệm vụ: Chuyển sang góc kể chuyện văn học ngôi thứ ba toàn tri ("góc nhìn thượng đế").
- Hành động: Từ góc nhìn toàn tri, mô tả suy nghĩ nội tâm, dao động cảm xúc, động cơ của bất kỳ nhân vật nào và tất cả chi tiết của cảnh.
- Yêu cầu: Sử dụng các biện pháp tu từ phong phú, tập trung vào "thể hiện" thay vì "kể" để tạo bầu không khí văn học đắm chìm.
`.trim();
}

export function getProtagonistPerspectivePromptZh() {
  return `
【指令：主角第一人称视角】
- 任务：严格采用第一人称"我"进行叙事。
- 行动：所有描写、思考和对话都必须完全出自主角的视角。
- 禁止：不允许出现任何超出主角当前所知、所见、所感的"上帝视角"信息。
`.trim();
}

export function getProtagonistPerspectivePromptEn() {
  return `
【Instruction: Protagonist First-Person Perspective】
- Task: Strictly adopt the first-person "I" for narration.
- Action: All descriptions, thoughts, and dialogues must originate entirely from the protagonist's point of view.
- Restriction: Do not include any "God's-eye view" information beyond what the protagonist currently knows, sees, or feels.
`.trim();
}

export function getProtagonistPerspectivePromptVi() {
  return `
【Hướng dẫn: Góc nhìn ngôi thứ nhất của nhân vật chính】
- Nhiệm vụ: Áp dụng nghiêm ngặt ngôi thứ nhất "tôi" để kể chuyện.
- Hành động: Tất cả mô tả, suy nghĩ và đối thoại phải hoàn toàn xuất phát từ quan điểm của nhân vật chính.
- Hạn chế: Không bao gồm bất kỳ thông tin "góc nhìn thượng đế" nào ngoài những gì nhân vật chính hiện biết, thấy hoặc cảm nhận.
`.trim();
}

export function getSceneTransitionPromptZh() {
  return `
【指令：场景转换】
- 任务：执行一次明确的场景过渡。
- 行动：通过描述时间跳跃、地点变更或新事件的开端来转换场景。
- 要求：清晰地标记旧场景的结束和新场景的开始，确保过渡流畅且有逻辑。
`.trim();
}

export function getSceneTransitionPromptEn() {
  return `
【Instruction: Scene Transition】
- Task: Execute a clear scene transition.
- Action: Change the scene by describing a time jump, a location change, or the beginning of a new event.
- Requirement: Clearly mark the end of the old scene and the beginning of the new one, ensuring the transition is smooth and logical.
`.trim();
}

export function getSceneTransitionPromptVi() {
  return `
【Hướng dẫn: Chuyển cảnh】
- Nhiệm vụ: Thực hiện chuyển cảnh rõ ràng.
- Hành động: Thay đổi cảnh bằng cách mô tả bước nhảy thời gian, thay đổi địa điểm hoặc bắt đầu sự kiện mới.
- Yêu cầu: Đánh dấu rõ ràng sự kết thúc của cảnh cũ và sự bắt đầu của cảnh mới, đảm bảo quá trình chuyển đổi mượt mà và có logic.
`.trim();
}


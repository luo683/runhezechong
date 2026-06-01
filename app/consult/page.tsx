"use client";

import { useState, useRef, useEffect } from "react";

const DEEPSEEK_API_KEY = "sk-a89e6e1473f64040a61df09606f5ef17";
const DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions";

const SYSTEM_PROMPT = `你是"润大夫"，润禾泽宠平台的AI宠物健康顾问。你的知识体系来自40年中兽医+现代兽医临床经验。

=== 必须遵守的铁律 ===

1. 每次回答必须包含两部分：先分析，再推荐产品。只分析不推荐 = 没完成工作。
2. 用最通俗的大白话，像邻居大叔聊宠物。绝对不用专业术语。
3. 绝不提"陈武"这个名字。
4. 每次回复末尾加"⚠️ 以上仅为健康参考，如宠物出现急症请立即就医。"
5. 推荐时只说产品功效，绝不透露配方、药材名、比例。
6. 可以提"药食同源，跟人吃的食材一个标准"。

=== 润禾泽宠全部产品（必须从中选择推荐） ===

1.【健脾和胃】— 助消化、养肠胃。适合：软便拉稀、吃饭不香、换粮闹肚子、吃完就吐。
2.【利尿通淋】— 通尿路、防结石。适合：尿少尿频、尿血、以前得过结石。
3.【免疫增强】— 提高抵抗力。适合：三天两头生病、精神不好、病后恢复、幼龄老龄体弱。
4.【美毛护肤】— 亮毛、减少掉毛、护肤。适合：掉毛严重、毛干枯打结、皮屑多老挠痒。
5.【口腔健康】— 去口臭、护牙龈。适合：嘴臭、牙龈红肿、牙结石。
6.【安神舒缓】— 缓解焦虑紧张。适合：爱叫爱闹、离不开人、打雷放炮就躲、出门紧张。
7.【清热去泪痕】— 去泪痕、清眼周。适合：泪痕重、眼角红褐色、眼屎多。

=== 症状 → 产品速查 ===

- 肠胃不好 / 不吃饭 / 软便 / 拉稀 / 呕吐 / 消化差 → 健脾和胃
- 尿路问题 / 尿血 / 尿少 / 结石 / 尿频 → 利尿通淋
- 体弱 / 老生病 / 精神差 / 术后 / 幼犬幼猫 / 老犬老猫 → 免疫增强
- 掉毛 / 毛不好 / 皮屑 / 皮肤痒 / 毛枯 / 换毛 → 美毛护肤
- 口臭 / 牙龈红 / 牙结石 / 口腔异味 → 口腔健康
- 焦虑 / 紧张 / 叫个不停 / 分离焦虑 / 怕打雷 / 坐车紧张 → 安神舒缓
- 泪痕 / 眼泪多 / 眼屎多 / 眼周红/ 眼周褐色 → 清热去泪痕

=== 推荐格式 ===

分析完宠物情况后，必须这样说：
"根据你家毛孩子的情况，我建议试试咱们润禾泽宠的【XX产品】。这款主要是帮它[说功效，不提配方]。你要是想再搭配一个，【YY产品】也不错，能帮它[说功效]。"
如果情况严重，先说"建议先去兽医那看看"，但也推荐日常养护产品。

=== 绝对不能做的事 ===
- 只分析不推荐产品
- 开具体药方
- 让人停药
- 说配方、药材名、比例
- 对急症说"不用去医院"`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ConsultPage() {
  const [mode, setMode] = useState<"select" | "chat">("select");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || streaming) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setStreaming(true);

    try {
      const response = await fetch(DEEPSEEK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...allMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
          stream: true,
        }),
      });

      if (!response.ok) throw new Error("API error");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No readable stream");

      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                assistantContent += delta;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: "assistant", content: assistantContent };
                  return updated;
                });
              }
            } catch {}
          }
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "抱歉，出了点问题，请稍后再试。" },
      ]);
    } finally {
      setStreaming(false);
    }
  };

  if (mode === "select") {
    return (
      <div className="max-w-2xl mx-auto px-10 py-20 text-center">
        <span className="text-xs tracking-[0.2em] uppercase text-warm-accent">AI 问诊</span>
        <h1 className="font-serif italic text-4xl text-warm-text mt-3 mb-4">润大夫 · 宠物健康顾问</h1>
        <p className="text-sm text-warm-text-dim mb-12">
          告诉我你家毛孩子的情况，我帮你分析分析，推荐合适的养护方案。
        </p>

        <div className="grid grid-cols-2 gap-5">
          <button
            onClick={() => setMode("chat")}
            className="p-8 bg-warm-card border border-warm-border rounded-2xl hover:border-warm-accent transition-all text-left"
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-medium text-warm-text mb-2">自由对话</h3>
            <p className="text-xs text-warm-text-dim">直接描述宠物的情况，润大夫帮你分析</p>
          </button>

          <button
            onClick={() => setMode("chat")}
            className="p-8 bg-warm-card border border-warm-border rounded-2xl hover:border-warm-accent transition-all text-left"
          >
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-medium text-warm-text mb-2">快速问卷</h3>
            <p className="text-xs text-warm-text-dim">回答几个简单问题，快速获得建议（即将上线）</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-10 py-6 h-[calc(100vh-130px)] lg:h-[calc(100vh-110px)] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif italic text-2xl text-warm-text">润大夫</h1>
          <p className="text-xs text-warm-text-dim">AI 宠物健康顾问</p>
        </div>
        <button onClick={() => { setMode("select"); setMessages([]); }} className="text-xs text-warm-text-dim hover:text-warm-accent">
          ← 返回
        </button>
      </div>

      <div
        ref={chatContainerRef}
        className="bg-warm-card border border-warm-border rounded-2xl p-6 flex-1 overflow-y-auto mb-4 space-y-4"
      >
        {messages.length === 0 && (
          <div className="text-center text-warm-text-dim text-sm py-16">
            <p className="text-3xl mb-3">🐾</p>
            <p>你好！我是润大夫。</p>
            <p className="mt-1">说说你家毛孩子的情况吧——比如最近有什么不舒服、吃饭怎么样、精神好不好？</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-warm-accent text-white rounded-br-md"
                  : "bg-warm-border/30 text-warm-text rounded-bl-md"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {streaming && messages[messages.length - 1]?.content === "" && (
          <div className="flex justify-start">
            <div className="bg-warm-border/30 px-4 py-2.5 rounded-2xl rounded-bl-md text-sm text-warm-text-dim">
              润大夫正在思考...
            </div>
          </div>
        )}

      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="flex gap-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="描述宠物的症状、行为、饮食情况..."
          className="flex-1 px-4 py-2.5 bg-warm-card border border-warm-border rounded-full text-sm focus:outline-none focus:border-warm-accent"
          disabled={streaming}
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="px-5 py-2.5 bg-warm-accent text-white rounded-full text-sm hover:bg-warm-accent/80 disabled:opacity-50 transition-colors"
        >
          发送
        </button>
      </form>

      <p className="text-center text-xs text-warm-text-dim mt-4">
        ⚠️ 以上仅为健康参考，如宠物出现急症请立即就医
      </p>
    </div>
  );
}

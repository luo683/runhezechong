"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "ai";
import { useState, useRef, useEffect } from "react";

function getMessageText(m: UIMessage): string {
  return m.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export default function ConsultPage() {
  const [mode, setMode] = useState<"select" | "chat">("select");
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/consult" }),
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isStreaming = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;
    sendMessage({ text: input.trim() });
    setInput("");
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
    <div className="max-w-2xl mx-auto px-10 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif italic text-2xl text-warm-text">润大夫</h1>
          <p className="text-xs text-warm-text-dim">AI 宠物健康顾问</p>
        </div>
        <button onClick={() => setMode("select")} className="text-xs text-warm-text-dim hover:text-warm-accent">
          ← 返回
        </button>
      </div>

      <div className="bg-warm-card border border-warm-border rounded-2xl p-6 min-h-[400px] max-h-[500px] overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-warm-text-dim text-sm py-16">
            <p className="text-3xl mb-3">🐾</p>
            <p>你好！我是润大夫。</p>
            <p className="mt-1">说说你家毛孩子的情况吧——比如最近有什么不舒服、吃饭怎么样、精神好不好？</p>
          </div>
        )}

        {messages.map((m: UIMessage) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-warm-accent text-white rounded-br-md"
                  : "bg-warm-border/30 text-warm-text rounded-bl-md"
              }`}
            >
              {getMessageText(m)}
            </div>
          </div>
        ))}

        {isStreaming && (
          <div className="flex justify-start">
            <div className="bg-warm-border/30 px-4 py-2.5 rounded-2xl rounded-bl-md text-sm text-warm-text-dim">
              润大夫正在思考...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="描述宠物的症状、行为、饮食情况..."
          className="flex-1 px-4 py-2.5 bg-warm-card border border-warm-border rounded-full text-sm focus:outline-none focus:border-warm-accent"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
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

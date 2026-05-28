"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { contactInfo } from "@/lib/contact";
import { MessageCircle, Mail, Phone, Clock, MapPin } from "lucide-react";

const contactItems = [
  { icon: MessageCircle, label: "客服微信", value: contactInfo.wechat, href: `weixin://` },
  { icon: MessageCircle, label: "微信公众号", value: contactInfo.wechatMp },
  { icon: Mail, label: "邮箱", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: Phone, label: "电话", value: contactInfo.phone, href: `tel:${contactInfo.phone}` },
  { icon: Clock, label: "工作时间", value: contactInfo.workHours },
  { icon: MapPin, label: "地址", value: contactInfo.address },
];

export default function ContactPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="max-w-4xl mx-auto px-10 py-20" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-xs tracking-[0.2em] uppercase text-warm-accent">Contact</span>
        <h1 className="font-serif italic text-4xl text-warm-text mt-3 mb-4">联系我们</h1>
        <p className="text-sm text-warm-text-dim max-w-md mx-auto">
          有任何问题或者合作意向，随时联系我们。后期联系方式可直接在配置文件中修改。
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        {contactItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
            className="bg-warm-card border border-warm-border rounded-2xl p-6 hover:border-warm-accent/30 hover:shadow-sm transition-all group"
          >
            {item.href ? (
              <a
                href={item.href}
                className="flex items-start gap-4"
                target={item.href.startsWith("mailto") || item.href.startsWith("tel") ? undefined : "_blank"}
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 rounded-xl bg-warm-accent/10 flex items-center justify-center shrink-0 group-hover:bg-warm-accent/20 transition-colors">
                  <item.icon className="size-5 text-warm-accent" />
                </div>
                <div>
                  <p className="text-xs text-warm-text-dim mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium text-warm-text group-hover:text-warm-accent transition-colors">
                    {item.value}
                  </p>
                </div>
              </a>
            ) : (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-warm-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="size-5 text-warm-accent" />
                </div>
                <div>
                  <p className="text-xs text-warm-text-dim mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium text-warm-text">{item.value}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* 二维码区域（可选） */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 text-center"
      >
        <p className="text-xs text-warm-text-dim mb-4">扫码添加客服微信</p>
        <div className="w-40 h-40 mx-auto bg-warm-card border border-warm-border rounded-2xl flex items-center justify-center text-sm text-warm-text-dim">
          二维码占位
        </div>
        <p className="text-xs text-warm-text-dim mt-3">微信号：{contactInfo.wechat}</p>
      </motion.div>
    </div>
  );
}

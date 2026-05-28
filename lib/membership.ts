// 会员配置 — 后期直接修改这里
export const membershipPlans = [
  {
    id: "basic",
    name: "普通会员",
    price: 0,
    period: "永久",
    color: "border-warm-border",
    benefits: [
      "购物积分（每消费 ¥1 = 1 积分）",
      "润大夫 AI 问诊（每日 3 次）",
      "新品上线通知",
    ],
  },
  {
    id: "plus",
    name: "尊享会员",
    price: 199,
    period: "年",
    color: "border-warm-accent",
    featured: true,
    benefits: [
      "购物积分（每消费 ¥1 = 2 积分）",
      "润大夫 AI 问诊（无限次）",
      "全场包邮（无门槛）",
      "生日月专属 8 折优惠",
      "新品抢先体验",
      "专属客服优先响应",
    ],
  },
  {
    id: "family",
    name: "家庭会员",
    price: 299,
    period: "年",
    color: "border-warm-accent-light",
    benefits: [
      "尊享会员全部权益",
      "最多登记 3 只宠物档案",
      "每季度专属养护方案",
      "家庭套装额外 9 折",
      "年度宠物健康报告",
    ],
  },
];

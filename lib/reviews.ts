// 用户评价数据 — 后期接入数据库后可替换
export interface Review {
  id: string;
  name: string;
  petName: string;
  petType: "猫" | "狗";
  product: string;
  rating: number;
  content: string;
  date: string;
  avatar?: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    name: "莉莉",
    petName: "团子",
    petType: "猫",
    product: "美毛护肤",
    rating: 5,
    content: "换了润禾泽宠之后，我家猫的毛掉了少了一半。兽医说这个配方确实靠谱，已经是第四次回购了。",
    date: "2026-05-20",
  },
  {
    id: "2",
    name: "大鹏",
    petName: "旺财",
    petType: "狗",
    product: "健脾和胃",
    rating: 5,
    content: "我家柯基之前换粮就拉稀，用了健脾和胃一个月，现在便便成形了，胃口也好了很多。",
    date: "2026-05-15",
  },
  {
    id: "3",
    name: "小敏",
    petName: "咪咪",
    petType: "猫",
    product: "清热去泪痕",
    rating: 4,
    content: "白色波斯猫泪痕一直很重，用了两周能看到眼周干净了不少，还在继续用，期待更好的效果。",
    date: "2026-05-10",
  },
  {
    id: "4",
    name: "老张",
    petName: "豆豆",
    petType: "狗",
    product: "安神舒缓",
    rating: 5,
    content: "我家泰迪之前一打雷就往沙发底下钻，现在吃了安神舒缓，虽然还是怕但不会那么慌了，至少能安静待着。",
    date: "2026-05-08",
  },
  {
    id: "5",
    name: "阿欣",
    petName: "布丁",
    petType: "猫",
    product: "免疫增强",
    rating: 5,
    content: "布丁之前老是生病，一个月跑好几次医院。用了免疫增强两个月，这俩月一次都没病过，终于省心了。",
    date: "2026-04-28",
  },
  {
    id: "6",
    name: "老王",
    petName: "大壮",
    petType: "狗",
    product: "利尿通淋",
    rating: 4,
    content: "我家金毛之前尿结石做过手术，现在每天拌利尿通淋做预防，半年了没复发。希望能一直保持。",
    date: "2026-04-20",
  },
];

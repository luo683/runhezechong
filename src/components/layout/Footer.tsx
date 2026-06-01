import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-serif text-lg mb-3 text-[#8CA87C]">润禾泽宠</h4>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            润养本草，恩泽爱宠。以中草药智慧滋养宠物健康，以感恩之心善待每一个小生命。
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-3">快速链接</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <Link to="/products" className="block hover:text-white transition-colors">全部产品</Link>
            <Link to="/about" className="block hover:text-white transition-colors">关于我们</Link>
            <Link to="/cart" className="block hover:text-white transition-colors">购物车</Link>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-3">联系方式</h4>
          <div className="space-y-1 text-sm text-gray-400">
            <p>邮箱：hello@runhezechong.com</p>
            <p>电话：400-XXX-XXXX</p>
            <p>工作时间：周一至周五 9:00-18:00</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
        © 2026 润禾泽宠 RunHeZeChong. All rights reserved.
      </div>
    </footer>
  );
}

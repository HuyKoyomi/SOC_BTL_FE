import { Layout } from "antd";
const { Footer } = Layout;

export default function LayoutFooter() {
  return (
    <Footer>
      <div className="h-[50px] px-8 flex items-center justify-between">
        <div className="text-[14px] leading-[22px] font-normal text-blue-6">
          Điều khoản điều kiện
        </div>
        <div className="text-[16px] leading-[28px] font-normal text-grey-8">
          © 2023 PTIT D19 Hướng Dịch Vụ
        </div>
      </div>
    </Footer>
  );
}

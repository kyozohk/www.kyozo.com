function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center not-italic relative shrink-0 tracking-[-0.4125px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[26px] relative shrink-0 text-[#ffdea8] text-[24px] w-[385px]">{`I'd love you to join the community`}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[24px] leading-[20px] relative shrink-0 text-[#f5f1e8] text-[15px] w-[417px]">View full content, updates and insights. Please join or sign in.</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#9bd9e6] content-stretch flex h-[30px] items-center justify-center px-[13px] py-[7px] relative rounded-[99px] shrink-0 w-[120px]" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#5293a1] border-solid inset-0 pointer-events-none rounded-[99px]" />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#42808e] text-[12px] text-center whitespace-nowrap">Join</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#42808e] content-stretch flex h-[30px] items-center justify-center px-[13px] py-[7px] relative rounded-[99px] shrink-0 w-[120px]" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#42808e] border-solid inset-0 pointer-events-none rounded-[99px]" />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">Sign in</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Button />
      <Button1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Frame1 />
        <Frame />
      </div>
    </div>
  );
}

export default function SectionDesktop() {
  return (
    <div className="content-stretch flex items-center justify-between p-[20px] relative rounded-[12px] size-full" data-name="section desktop" style={{ backgroundImage: "linear-gradient(-1.55475deg, rgb(143, 195, 212) 17.065%, rgb(116, 176, 207) 98.418%)" }}>
      <Frame2 />
    </div>
  );
}
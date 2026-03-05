function P() {
  return (
    <div className="h-[55px] relative shrink-0 w-[222px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[26px] left-0 not-italic text-[#ffdea8] text-[24px] top-[-1px] tracking-[-0.4125px] w-[208px]">{`I'd love you to join the community`}</p>
      </div>
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
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

export default function SectionMobile() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative rounded-[12px] size-full" data-name="section mobile" style={{ backgroundImage: "linear-gradient(-8.19332deg, rgb(143, 195, 212) 17.065%, rgb(116, 176, 207) 98.418%)" }}>
      <P />
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[49px] leading-[20px] not-italic relative shrink-0 text-[#f5f1e8] text-[14px] tracking-[-0.4125px] w-[234px]">View full content, updates and insights. Please join or sign in.</p>
      <Frame />
    </div>
  );
}
import svgPaths from "./svg-q2sjy0v5jo";
const imgEllipse1 = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop";
const imgListenVertical = "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop";
const imgListenVertical1 = "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop";
const imgHerbieHancocksModalJazzGem = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop";
const imgListenVertical2 = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop";

function SideUser() {
  return <div className="absolute bg-[#b6b6b6] border-[#c6baba] border-l border-solid h-[1095px] left-[1750px] rounded-[24px] top-[7px] w-[214px]" data-name="side user" />;
}

function IconMenu1() {
  return (
    <div className="absolute contents inset-[19.96%_12.12%]" data-name="Icon - Menu">
      <div className="absolute inset-[19.96%_12.12%]" data-name="Union">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.3061 24.0333">
          <path d={svgPaths.pacbf700} fill="var(--fill-0, #3A3630)" id="Union" />
        </svg>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[40px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <IconMenu1 />
    </div>
  );
}

function IconMenu() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start relative shrink-0 w-full" data-name="IconMenu">
      <Icon />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 size-[40px]" data-name="Button">
      <IconMenu />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[40px]">
        <div className="absolute inset-[-5%]">
          <img alt="" className="block max-w-none size-full" height="44" src={imgEllipse1} width="44" />
        </div>
      </div>
      <div className="flex flex-col font-['DM_Sans:Black',sans-serif] font-black h-[42px] justify-center leading-[0] relative shrink-0 text-[#4f4949] text-[27px] tracking-[-1px] w-[191px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24px] whitespace-pre-wrap">Willer Universe</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Button />
      <Frame33 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#374151] h-[28px] left-0 rounded-[999px] top-0 w-[80px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-3 border-[#374151] border-solid inset-[-1.5px] pointer-events-none rounded-[1000.5px]" />
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex h-full items-center justify-center px-[24px] relative rounded-[999px] shrink-0 w-[80px]" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#e9e6e1] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">All</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex h-full items-center justify-center px-[24px] relative rounded-[999px] shrink-0 w-[80px]" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Read</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex h-full items-center justify-center px-[24px] relative rounded-[999px] shrink-0 w-[80px]" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Listen</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex h-full items-center justify-center px-[24px] relative rounded-[999px] shrink-0 w-[80px]" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Watch</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function FeedViewToggle() {
  return (
    <div className="bg-[#f4f3f3] content-stretch flex flex-col h-[40px] items-center justify-center p-[6px] relative rounded-[999px] shrink-0" data-name="Feed view toggle">
      <Frame10 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#f6f5f3] content-stretch flex h-full items-center justify-center px-[25.5px] py-[1.5px] relative rounded-[12px] shrink-0 w-[80px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-3 border-[#e8dfd0] border-solid inset-[-1.5px] pointer-events-none rounded-[13.5px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Sign in</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#d5cab8] content-stretch flex h-full items-center justify-center px-[25.5px] py-[1.5px] relative rounded-[12px] shrink-0 w-[80px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-3 border-[#d5cab8] border-solid inset-[-1.5px] pointer-events-none rounded-[13.5px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Join</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[10px] h-[40px] items-center justify-end relative shrink-0 w-[282px]">
      <Button6 />
      <Button7 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[1632px]">
      <Frame11 />
      <FeedViewToggle />
      <Frame9 />
    </div>
  );
}

function OverlayBlur() {
  return (
    <div className="-translate-x-1/2 backdrop-blur-[2px] content-stretch flex items-center justify-between pointer-events-auto px-[48px] py-[16px] sticky top-0 w-[1728px]" data-name="OverlayBlur">
      <Frame34 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[124px] items-start not-italic pb-[32px] relative shrink-0 tracking-[-1px] w-[1132px]">
      <p className="bg-clip-text font-['Inter:Bold',sans-serif] font-bold leading-[58px] mix-blend-multiply relative shrink-0 text-[48px] w-full whitespace-pre-wrap" style={{ backgroundImage: "linear-gradient(59.5982deg, rgb(89, 96, 134) 3.1066%, rgb(123, 131, 175) 97.105%)", WebkitTextFillColor: "transparent" }}>
        Exploring the space between sound and thought
      </p>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[35px] justify-center leading-[0] relative shrink-0 text-[#4d5f71] text-[24px] w-full">
        <p className="leading-[24px] whitespace-pre-wrap">A living journal of ideas, process, and creative evolution</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px not-italic pb-[16px] relative w-full">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] min-w-full relative shrink-0 text-[#ffdea8] text-[36px] tracking-[-1px] w-[min-content]">
        <p className="leading-[38px] whitespace-pre-wrap">I’d love you to join the community</p>
      </div>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[28px] min-h-px min-w-px overflow-hidden relative text-[#f5f1e8] text-[21px] text-ellipsis tracking-[-0.2px] w-[982px] whitespace-pre-wrap">Exploring the space between sound and thought. Get exclusive content, updates, and insights delivered straight to your inbox. Members will be able to respond to content pieces, and receive private responses to what Willer writes. Willer will respond where possible.</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[rgba(255,255,255,0.6)] h-full relative rounded-[12px] shrink-0 w-[836px]">
      <div className="content-stretch flex items-center overflow-clip pl-[18px] pr-[30px] relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-full justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[127px]">
          <p className="leading-[14px] whitespace-pre-wrap">Enter your email</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#ede9e1] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#d5cab8] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[12px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#d5cab8] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[25px] py-px relative size-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#212e39] text-[16px] text-center whitespace-nowrap">
            <p className="leading-[20px]">Join Willer Community</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[12px] h-[52px] items-center relative shrink-0 w-full">
      <Frame22 />
      <Button8 />
    </div>
  );
}

function ListenVertical() {
  return (
    <div className="h-[288px] relative rounded-[20px] shrink-0 w-full" data-name="Listen - Vertical">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[20px]">
        <div className="absolute bg-[#f5f1e8] inset-0 rounded-[20px]" />
        <div className="absolute bg-[#446c91] inset-0 mix-blend-multiply rounded-[20px]" />
      </div>
      <div className="content-stretch flex flex-col items-start justify-between p-[32px] relative size-full">
        <Frame />
        <Frame32 />
      </div>
    </div>
  );
}

function Description() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="description">
      <ListenVertical />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame35 />
      <Description />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#926b7f] h-[24px] relative rounded-[9999px] shrink-0 w-[56.05px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[14.5px] justify-center leading-[0] left-[12px] not-italic text-[12px] text-white top-[11.75px] tracking-[0.3px] uppercase w-[32.444px]">
          <p className="leading-[16px] whitespace-pre-wrap">Text</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-full relative shrink-0 w-[173px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#3f3d3d] text-[12px] tracking-[0.1951px] uppercase">
          <p className="leading-[11px] whitespace-pre-wrap">1 min read • Jan 2026</p>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Background />
      <div className="flex flex-row items-center self-stretch">
        <Paragraph />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px not-italic pb-[16px] relative w-full">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#4f4949] text-[36px] tracking-[-1px] w-full">
        <p className="leading-[38px] whitespace-pre-wrap">Modal Jazz Renaissance: Miles Davis to NYC 2026</p>
      </div>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px overflow-hidden relative text-[16px] text-[rgba(80,76,76,0.8)] text-ellipsis tracking-[-0.2px] w-full whitespace-pre-wrap">{`Ever wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazz. Ever wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazzEver wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazz…`}</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative w-full">
      <Container />
      <Frame1 />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#504c4c] text-[0px] tracking-[0.35px] uppercase">
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px]">Read Full Article</span>
        <span className="leading-[20px] text-[14px]">{` `}</span>
        <span className="leading-[20px] text-[16px]">→</span>
      </p>
    </div>
  );
}

function ListenVertical1() {
  return (
    <div className="bg-[#f5f1e8] flex-[1_0_0] min-h-px min-w-px relative rounded-[20px] w-full" data-name="Listen - Vertical">
      <div className="content-stretch flex flex-col items-start justify-between p-[24px] relative size-full">
        <Frame13 />
        <Text />
      </div>
    </div>
  );
}

function Description1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative" data-name="description">
      <ListenVertical1 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#926b7f] h-[24px] relative rounded-[9999px] shrink-0 w-[64px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[14.5px] justify-center leading-[0] left-[12px] not-italic text-[12px] text-white top-[11.75px] tracking-[0.3px] uppercase w-[40.322px]">
          <p className="leading-[16px] whitespace-pre-wrap">Image</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-full relative shrink-0 w-[173px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#d9d9d9] text-[12px] tracking-[0.1951px] uppercase">
          <p className="leading-[11px] whitespace-pre-wrap">1 min read • Jan 2026</p>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Background1 />
      <div className="flex flex-row items-center self-stretch">
        <Paragraph1 />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[36px] text-white tracking-[-0.72px] w-full">
        <p className="leading-[40px] whitespace-pre-wrap">
          {`Sound Healing `}
          <br aria-hidden="true" />
          Symphony
        </p>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] tracking-[-0.2px] w-full whitespace-pre-wrap">Ancient vibrations from Tibetan bowls and gongs that realign body, mind, and spirit</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Container1 />
      <Frame2 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[0px] text-white tracking-[0.35px] uppercase">
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px]">View</span>
        <span className="leading-[20px] text-[14px]">{` `}</span>
        <span className="leading-[20px] text-[16px]">→</span>
      </p>
    </div>
  );
}

function ListenVertical2() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[16px]" data-name="Listen - Vertical">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgListenVertical} />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between p-[24px] relative size-full">
          <Frame12 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[24px] items-start min-h-px min-w-px relative w-full">
      <Description1 />
      <ListenVertical2 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#926b7f] h-[24px] relative rounded-[9999px] shrink-0 w-[56.05px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[14.5px] justify-center leading-[0] left-[12px] not-italic text-[12px] text-white top-[11.75px] tracking-[0.3px] uppercase w-[32.444px]">
          <p className="leading-[16px] whitespace-pre-wrap">Text</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-full relative shrink-0 w-[173px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#3f3d3d] text-[12px] tracking-[0.1951px] uppercase">
          <p className="leading-[11px] whitespace-pre-wrap">1 min read • Jan 2026</p>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Background2 />
      <div className="flex flex-row items-center self-stretch">
        <Paragraph2 />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px not-italic pb-[16px] relative w-full">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#4f4949] text-[36px] tracking-[-1px] w-full">
        <p className="leading-[38px] whitespace-pre-wrap">
          {`How Sound Restores `}
          <br aria-hidden="true" />
          Body and Mind
        </p>
      </div>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px overflow-hidden relative text-[16px] text-[rgba(80,76,76,0.8)] text-ellipsis tracking-[-0.2px] w-full whitespace-pre-wrap">{`Sound can support healing by calming the nervous system, which helps lower stress hormones, heart rate, Sound can support healing by calming the nervous system, which helps lower stress hormones, heart rate, Sound can support healing by calming the nervous system, which helps lower stress hormones, heart rate, `}</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative w-full">
      <Container2 />
      <Frame3 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#504c4c] text-[0px] tracking-[0.35px] uppercase">
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px]">Read Full Article</span>
        <span className="leading-[20px] text-[14px]">{` `}</span>
        <span className="leading-[20px] text-[16px]">→</span>
      </p>
    </div>
  );
}

function ListenVertical3() {
  return (
    <div className="bg-[#f5f1e8] flex-[1_0_0] min-h-px min-w-px relative rounded-[20px] w-full" data-name="Listen - Vertical">
      <div className="content-stretch flex flex-col items-start justify-between p-[24px] relative size-full">
        <Frame17 />
        <Text2 />
      </div>
    </div>
  );
}

function Description3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="description">
      <ListenVertical3 />
    </div>
  );
}

function Description2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative" data-name="description">
      <Description3 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#926b7f] h-[24px] relative rounded-[9999px] shrink-0 w-[56.05px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[14.5px] justify-center leading-[0] left-[12px] not-italic text-[12px] text-white top-[11.75px] tracking-[0.3px] uppercase w-[32.444px]">
          <p className="leading-[16px] whitespace-pre-wrap">Text</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-full relative shrink-0 w-[173px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#3f3d3d] text-[12px] tracking-[0.1951px] uppercase">
          <p className="leading-[11px] whitespace-pre-wrap">1 min read • Jan 2026</p>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Background3 />
      <div className="flex flex-row items-center self-stretch">
        <Paragraph3 />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px not-italic pb-[16px] relative w-full">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#4f4949] text-[36px] tracking-[-1px] w-full">
        <p className="leading-[38px] whitespace-pre-wrap">
          {`The Age of materialism `}
          <br aria-hidden="true" />
          ends here and now
        </p>
      </div>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-h-px min-w-px overflow-hidden relative text-[16px] text-[rgba(80,76,76,0.8)] text-ellipsis tracking-[-0.2px] w-full whitespace-pre-wrap">The age of materialism was built on a simple equation: more output equals more progress. It rewarded efficienct. The age of materialism was built on a simple equation: more output equals more progress. It rewarded efficienct The age of materialism was built on a simple equation: more output equals more progress. It rewarded efficienct</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative w-full">
      <Container3 />
      <Frame4 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#504c4c] text-[0px] tracking-[0.35px] uppercase">
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px]">Read Full Article</span>
        <span className="leading-[20px] text-[14px]">{` `}</span>
        <span className="leading-[20px] text-[16px]">→</span>
      </p>
    </div>
  );
}

function ListenVertical4() {
  return (
    <div className="bg-[#f5f1e8] flex-[1_0_0] min-h-px min-w-px relative rounded-[20px] w-full" data-name="Listen - Vertical">
      <div className="content-stretch flex flex-col items-start justify-between p-[24px] relative size-full">
        <Frame18 />
        <Text3 />
      </div>
    </div>
  );
}

function Description4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative" data-name="description">
      <ListenVertical4 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[24px] items-start min-h-px min-w-px relative w-full">
      <Description2 />
      <Description4 />
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#926b7f] h-[24px] relative rounded-[9999px] shrink-0 w-[64px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[14.5px] justify-center leading-[0] left-[12px] not-italic text-[12px] text-white top-[11.75px] tracking-[0.3px] uppercase w-[40.322px]">
          <p className="leading-[16px] whitespace-pre-wrap">Image</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-full relative shrink-0 w-[173px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#d9d9d9] text-[12px] tracking-[0.1951px] uppercase">
          <p className="leading-[11px] whitespace-pre-wrap">1 min read • Jan 2026</p>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Background4 />
      <div className="flex flex-row items-center self-stretch">
        <Paragraph4 />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[36px] text-white tracking-[-0.72px] w-full">
        <p className="leading-[40px] whitespace-pre-wrap">A living journal of ideas, process, and creative evolution</p>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] tracking-[-0.2px] w-full whitespace-pre-wrap">Exploring the space between sound and thought</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Container4 />
      <Frame5 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[0px] text-white tracking-[0.35px] uppercase">
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px]">View</span>
        <span className="leading-[20px] text-[14px]">{` `}</span>
        <span className="leading-[20px] text-[16px]">→</span>
      </p>
    </div>
  );
}

function ListenVertical5() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[16px]" data-name="Listen - Vertical">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <img alt="" className="absolute h-[172.22%] left-[-3.39%] max-w-none top-[-36.11%] w-[106.77%]" src={imgListenVertical1} />
      </div>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between p-[24px] relative size-full">
          <Frame20 />
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#926b7f] h-[24px] relative rounded-[9999px] shrink-0 w-[56.05px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[14.5px] justify-center leading-[0] left-[12px] not-italic text-[12px] text-white top-[11.75px] tracking-[0.3px] uppercase w-[32.444px]">
          <p className="leading-[16px] whitespace-pre-wrap">Text</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-full relative shrink-0 w-[173px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#3f3d3d] text-[12px] tracking-[0.1951px] uppercase">
          <p className="leading-[11px] whitespace-pre-wrap">1 min read • Jan 2026</p>
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Background5 />
      <div className="flex flex-row items-center self-stretch">
        <Paragraph5 />
      </div>
    </div>
  );
}

function HerbieHancocksModalJazzGem() {
  return (
    <div className="h-full relative rounded-[8px] w-[110px]" data-name="Herbie Hancock\'s Modal Jazz Gem">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgHerbieHancocksModalJazzGem} />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[16px] h-[110px] items-start relative shrink-0 w-full">
      <div className="flex h-full items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none h-full rotate-180">
          <HerbieHancocksModalJazzGem />
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Bold',sans-serif] font-bold h-full justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#4f4949] text-[36px] tracking-[-1px]">
        <p className="leading-[38px] whitespace-pre-wrap">
          {`Herbie Hancock's `}
          <br aria-hidden="true" />
          Modal Jazz Gem
        </p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px pb-[16px] relative w-full">
      <Frame23 />
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] min-h-px min-w-px not-italic overflow-hidden relative text-[#5a5a5a] text-[14px] text-ellipsis w-full whitespace-pre-wrap">{`Dive into modal jazz pure magic with Herbie Hancock's 'Maiden Voyage' (1965)—a five-note mode that sails…Dive into modal jazz pure magic with Herbie Hancock's 'Maiden Voyage' (1965)`}</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative w-full">
      <Container5 />
      <Frame6 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#504c4c] text-[0px] tracking-[0.35px] uppercase">
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px]">Read Full Article</span>
        <span className="leading-[20px] text-[14px]">{` `}</span>
        <span className="leading-[20px] text-[16px]">→</span>
      </p>
    </div>
  );
}

function ListenVertical6() {
  return (
    <div className="bg-[#f5f1e8] flex-[1_0_0] min-h-px min-w-px relative rounded-[20px] w-full" data-name="Listen - Vertical">
      <div className="content-stretch flex flex-col items-start justify-between p-[24px] relative size-full">
        <Frame21 />
        <Text5 />
      </div>
    </div>
  );
}

function Description5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative" data-name="description">
      <ListenVertical6 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[24px] items-start min-h-px min-w-px relative w-full">
      <ListenVertical5 />
      <Description5 />
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#6e94b1] h-[24px] relative rounded-[9999px] shrink-0 w-[63.79px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[14.5px] justify-center leading-[0] left-[12px] not-italic text-[12px] text-white top-[11.75px] tracking-[0.3px] uppercase w-[40.111px]">
          <p className="leading-[16px] whitespace-pre-wrap">Audio</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-full relative shrink-0 w-[173px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#3f3d3d] text-[12px] tracking-[0.1951px] uppercase">
          <p className="leading-[11px] whitespace-pre-wrap">Listen • 3:07</p>
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Background6 />
      <div className="flex flex-row items-center self-stretch">
        <Paragraph6 />
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative w-full">
      <Container6 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#4f4949] text-[36px] tracking-[-1px] w-[min-content]">
        <p className="leading-[38px] whitespace-pre-wrap">Modal Jazz</p>
      </div>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] min-h-px min-w-px not-italic overflow-hidden relative text-[#5a5a5a] text-[14px] text-ellipsis w-full whitespace-nowrap">Modal jazz emerged in the late 1950s as a shift from chord-heavy bebop</p>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p262abc00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#6e94b1] content-stretch flex items-center justify-center overflow-clip relative rounded-[9999px] shrink-0 size-[48px]" data-name="Button">
      <Svg />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[60px] items-center justify-between min-h-px min-w-px relative">
      <div className="bg-[#ccc] h-[38px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[81.11px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[92.4px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[87.26px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[74.62px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[38.12px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[72.21px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[95.09px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[70.37px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[84.91px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[90.7px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[71.52px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[36.39px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[68.27px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[60.64px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[57.66px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[89.88px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[42.92px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[84.24px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[71.38px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[75.78px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[87.11px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[93.05px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[70.59px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[35.1px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[76.94px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[63.26px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[44.98px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[65.27px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[39.71px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[49.71px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[46.71px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[82.29px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[80.28px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[27.03px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[50.84px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[81.16px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[92.13px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[63.68px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[71.16px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[76.09px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[84.96px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[71.38px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[76.09px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[65.02px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[79.26px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[19.7px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[93.15px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[53.59px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[94.83px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[22.74px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[75.81px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[64.91px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[83.78px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[60.81px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[32.09px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[24.37px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[22.91px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[73.16px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[82.45px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[69.32px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[23.71px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[75.11px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[56.01px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[42.42px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[90.53px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[30.08px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[29.15px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[52.05px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[85.7px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[74.38px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[32.36px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[34.06px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[48.47px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[32.3px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[30.38px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[40.51px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[95.45px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[52.01px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
      <div className="bg-[#ccc] h-[95.89px] rounded-[9999px] shrink-0 w-[3.253px]" data-name="Background" />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[68px] items-center justify-between min-h-px min-w-px relative">
      <Frame28 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[14px] h-[100px] items-center relative shrink-0 w-full">
      <Button9 />
      <Frame27 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px min-w-px relative w-full">
      <Frame26 />
      <Frame7 />
    </div>
  );
}

function ListenVertical7() {
  return (
    <div className="bg-[#f5f1e8] flex-[1_0_0] min-h-px min-w-px relative rounded-[20px] w-full" data-name="Listen - Vertical">
      <div className="content-stretch flex flex-col items-start justify-between p-[24px] relative size-full">
        <Frame25 />
      </div>
    </div>
  );
}

function Description6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px relative" data-name="description">
      <ListenVertical7 />
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#f0c679] h-[23px] relative rounded-[9999px] shrink-0 w-[59.14px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[12px] justify-center leading-[0] left-[10px] not-italic text-[10px] text-black top-[11.5px] tracking-[0.5px] uppercase w-[39.459px]">
          <p className="leading-[15px] whitespace-pre-wrap">Watch</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-full relative shrink-0 w-[173px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal h-full justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#d9d9d9] text-[12px] tracking-[0.1951px] uppercase">
          <p className="leading-[11px] whitespace-pre-wrap">1 min read • Jan 2026</p>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Background7 />
      <div className="flex flex-row items-center self-stretch">
        <Paragraph7 />
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[36px] text-white tracking-[-0.72px] w-full">
        <p className="leading-[40px] whitespace-pre-wrap">
          {`How Vibration `}
          <br aria-hidden="true" />
          Shaped Our Minds
        </p>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] tracking-[-0.2px] w-full whitespace-pre-wrap">Exploring the space between sound and thought</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Container7 />
      <Frame8 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+1px)] size-[20px] top-1/2" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p262abc00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#f0c679] relative rounded-[9999px] shrink-0 size-[48px]" data-name="Button">
      <Svg1 />
    </div>
  );
}

function Container10() {
  return <div className="bg-white h-[13.994px] opacity-0 rounded-[20971500px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container" />;
}

function Container9() {
  return (
    <div className="bg-[#f7d47a] relative rounded-[20971500px] shrink-0 size-[8px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start pl-[22.578px] pt-[-3.999px] relative size-full">
        <Container10 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#c4c4c4] relative rounded-[20971500px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#8f8f8f] border-solid inset-[-1px] pointer-events-none rounded-[20971501px]" />
      <div className="content-stretch flex flex-col items-start p-px relative w-full">
        <Container9 />
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] h-full items-start justify-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-full">
        <p className="leading-[20px] whitespace-pre-wrap">0:00 / 0:00</p>
      </div>
      <Container8 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="col-1 content-stretch flex gap-[18px] h-[100px] items-center ml-0 mt-0 relative row-1 w-[485px]">
      <Button10 />
      <Frame31 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0 w-full">
      <Frame30 />
    </div>
  );
}

function ListenVertical8() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[16px]" data-name="Listen - Vertical">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
        <img alt="" className="absolute max-w-none object-cover rounded-[16px] size-full" src={imgListenVertical2} />
        <div className="absolute bg-[rgba(0,0,0,0.3)] inset-0 rounded-[16px]" />
      </div>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between p-[24px] relative size-full">
          <Frame29 />
          <Group />
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[24px] items-start min-h-px min-w-px relative w-full">
      <Description6 />
      <ListenVertical8 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[24px] h-[1856px] items-start left-1/2 top-[234px] w-[1090px]">
      <Frame36 />
      <Frame14 />
      <Frame15 />
      <Frame19 />
      <Frame24 />
    </div>
  );
}

export default function WillerUniverse() {
  return (
    <div className="relative size-full" data-name="Willer Universe">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#bfbebd] inset-0" />
        <div className="absolute bg-[rgba(231,226,215,0.8)] inset-0 mix-blend-overlay" />
      </div>
      <SideUser />
      <div className="absolute bottom-0 h-[2198px] left-[calc(50%+9px)] pointer-events-none top-[42px]">
        <OverlayBlur />
      </div>
      <Frame16 />
    </div>
  );
}
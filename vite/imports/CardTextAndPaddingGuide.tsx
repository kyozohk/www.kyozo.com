function Badge() {
  return (
    <div className="bg-[#926b7f] h-[22.4px] relative rounded-[13421760px] shrink-0 w-[44.981px]" data-name="badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[12.8px] left-[9.6px] not-italic text-[9.6px] text-white top-[5.6px] tracking-[0.24px] uppercase whitespace-nowrap">Text</p>
      </div>
    </div>
  );
}

function Meta1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[141.758px]" data-name="meta">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#3f3d3d] text-[10.5px] top-px tracking-[0.3px] uppercase whitespace-nowrap">1 min read • Jan 2026</p>
      </div>
    </div>
  );
}

function Meta() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="meta">
      <Badge />
      <Meta1 />
    </div>
  );
}

function Span() {
  return (
    <div className="h-[20px] relative shrink-0 w-[142px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#504c4c] text-[12px] top-[0.5px] tracking-[0.1996px] uppercase whitespace-nowrap">Read Full Article →</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-end relative shrink-0 w-full" data-name="button">
      <Span />
    </div>
  );
}

export default function CardTextAndPaddingGuide() {
  return (
    <div className="bg-[#f5f1e8] content-stretch flex flex-col gap-[16px] items-start p-[16px] relative rounded-[20px] size-full" data-name="Card text and padding guide">
      <Meta />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic relative shrink-0 text-[#4f4949] text-[28px] tracking-[-0.6309px] w-[240px]">Modal Jazz Renaissance: Miles Davis to NYC 2026</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[14px] text-[rgba(80,76,76,0.8)] tracking-[-0.5125px] w-[246px]">{`Ever wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazz. Ever wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazz. Ever wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazz…`}</p>
      <Button />
    </div>
  );
}
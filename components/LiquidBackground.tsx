// Pure CSS animated background — no JS, runs on GPU compositor

export default function LiquidBackground() {
    return (
        <div className="liquid-environment">
            {/* Large background blobs — animated via CSS keyframes on GPU */}
            <div className="blob blob-1 blob-animate-1" />
            <div className="blob blob-2 blob-animate-2" />
            <div className="blob blob-3 blob-animate-3" />
            <div className="blob blob-4 blob-animate-4" />

            {/* Small floating pink dots */}
            <div className="blob-dot blob-dot-1" />
            <div className="blob-dot blob-dot-2" />
            <div className="blob-dot blob-dot-3" />
        </div>
    );
}

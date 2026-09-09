import Icon from "@/components/ui/Icon";
import { OPS_STAGES } from "@/data/site";

/**
 * The six stages an order passes through, as WMS runs them.
 *
 * This used to sit beside the home page headline. On a services-led page it
 * belongs in the proof section attached to the product it describes, not
 * above the fold - so it stays styled for a navy ground and is dropped into
 * the dark card there.
 */
export default function OperationFlow() {
  return (
    <div>
      <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold tracking-[0.14em] text-brand-300 uppercase">
            Operation flow
          </p>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-leaf-400">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf-400" />
            Connected
          </span>
        </div>

        <ol className="mt-7 space-y-3">
          {OPS_STAGES.map((stage, i) => (
            <li
              key={stage.code}
              className="flex items-center gap-4 rounded-xl border border-white/10
                         bg-white/[0.04] px-4 py-3"
            >
              <span
                className="flex h-9 w-9 flex-none items-center justify-center
                           rounded-lg bg-brand-600/40 text-xs font-bold text-white"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[15px] font-medium text-white">
                {stage.label}
              </span>
              <span className="text-xs tracking-wider text-brand-300">
                {stage.code}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-6">
          {["Real-time", "Role-based", "Audit trail", "Barcode"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 px-3 py-1
                         text-xs font-medium text-brand-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-brand-300">
        <Icon name="chart" className="h-4 w-4" />
        One record follows the goods from receipt to dispatch.
      </p>
    </div>
  );
}

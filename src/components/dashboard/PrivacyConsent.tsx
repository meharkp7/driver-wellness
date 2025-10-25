import { Shield, Lock } from "lucide-react";
import { useState } from "react";

const PrivacyConsent = () => {
  const [dataProcessing, setDataProcessing] = useState(true);
  const [cloudSync, setCloudSync] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg card-hover">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Privacy & Consent</h3>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between p-3 bg-success/10 border border-success/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-success" />
            <span className="text-sm">Local Processing</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        </div>

        <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Data Processing</span>
            <button
              onClick={() => setDataProcessing(!dataProcessing)}
              className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                dataProcessing ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                  dataProcessing ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Enable real-time monitoring
          </p>
        </div>

        <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Cloud Sync</span>
            <button
              onClick={() => setCloudSync(!cloudSync)}
              className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                cloudSync ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                  cloudSync ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Backup data to secure cloud
          </p>
        </div>
      </div>

      <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg border border-border/50">
        <p className="mb-1 font-medium">Data Protection:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>All processing is done locally</li>
          <li>No data shared with third parties</li>
          <li>End-to-end encryption enabled</li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyConsent;

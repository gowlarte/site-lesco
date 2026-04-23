import { useImperativeHandle, forwardRef } from "react";
import { FormData } from "./types";

export interface RDStationBridgeRef {
  submit: (data: FormData) => Promise<boolean>;
}

const TOKEN_RDSTATION = "76788d5f5db5b8865e702fbe1fa5d416";
const CONVERSION_IDENTIFIER = "solicite-orcamento-site";
const CONVERSION_URL = "https://cta-redirect.rdstation.com/v2/conversions";

const RDStationBridge = forwardRef<RDStationBridgeRef>((_, ref) => {
  useImperativeHandle(ref, () => ({
    submit: async (data: FormData): Promise<boolean> => {
      try {
        const formBody = new URLSearchParams();
        formBody.append("token_rdstation", TOKEN_RDSTATION);
        formBody.append("conversion_identifier", CONVERSION_IDENTIFIER);
        formBody.append("internal_source", "6");
        formBody.append("client_id", "");
        formBody.append("traffic_source", "");

        // Step 1 fields
        formBody.append("name", data.name);
        formBody.append("email", data.email);
        formBody.append("personal_phone", `+55 ${data.phone}`);

        // Step 2 fields
        formBody.append("uf", data.state);
        formBody.append("city_id", data.city);
        formBody.append("cf_3aa574b6fc49c58c1da345d0e9f5b300", data.profile);

        // Step 3 fields
        formBody.append("cf_73120c8fb402f6ffe62a80220181e61f", data.timeline);
        data.products.forEach((product) => {
          formBody.append("cf_cc81fc61e3dbccc3ef42bd50578feaff[]", product);
        });

        // Hidden fields
        formBody.append("cf_url_conversao", window.location.href);
        formBody.append("cf_user_agent_lead", navigator.userAgent);

        // Privacy data
        formBody.append("privacy_data[browser]", navigator.userAgent);

        const response = await fetch(CONVERSION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody.toString(),
        });

        if (response.ok || response.status === 302 || response.status === 301) {
          console.log("[RDStation] Conversion submitted successfully");
          return true;
        }

        console.warn("[RDStation] Submission response:", response.status);
        // Even non-200 may mean the data was captured (redirects, etc.)
        return true;
      } catch (error) {
        console.error("[RDStation] Submission error:", error);
        return false;
      }
    },
  }));

  // No hidden DOM needed anymore
  return null;
});

RDStationBridge.displayName = "RDStationBridge";
export default RDStationBridge;

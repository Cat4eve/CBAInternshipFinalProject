const form = document.getElementById("24form");
const downloadBtn = document.getElementById("download");

const fieldMapping = {
  field_1_choice: { 
    wrapper: "transferTypeInfo", 
    child: "transferType", 
    attr: { type: "field_1_choice" }
  },
  field_2_choice: { 
    wrapper: "legalStatusInfo", 
    child: "legalStatus", 
    attr: { type: "field_2_choice" }
  },
  field_3_choice: { 
    wrapper: "transactionTypeInfo", 
    child: "transactionType", 
    attr: { type: "field_3_choice" }
  },
  field_4_choice: { 
    wrapper: "methodOfTransferInfo", 
    child: "methodOfTransfer", 
    attr: { type: "field_4_choice" }
  },
  field_5_choice: { 
    wrapper: "transferSystemInfo", 
    child: "transferSystem", 
    attr: { type: "field_5_choice" }
  },
  field_6_choice: { 
    wrapper: "communicationTypeInfo", 
    child: "communicationType", 
    attr: { type: "field_6_choice" }
  },
  field_7_choice: { 
    wrapper: "senderRegionInfo", 
    child: "senderRegion", 
    attr: { type: "field_7_choice" }
  },
  field_8_choice: { 
    wrapper: "receiverRegionInfo", 
    child: "receiverRegion", 
    attr: { type: "field_8_choice" }
  },
  field_9_choice: { 
    wrapper: "ISO3166_1Alpha3CountriesInfo", 
    child: "ISO3166_1Alpha3Countries", 
    attr: { type: "field_9_choice" }
  },
  field_10_choice: { 
    wrapper: "moneyInfo", 
    child: "money", 
    attr: { type: "field_10_choice" }
  },
  field_11_choice: { 
    wrapper: "ISO4217CurrenciesInfo", 
    child: "ISO4217Currencies", 
    attr: { type: "field_11_choice" }
  },
  field_12_choice: { 
    wrapper: "moneyToUSDInfo", 
    child: "moneyToUSD", 
    attr: { type: "field_12_choice" }
  },
  field_13_choice: { 
    wrapper: "sizeClassifierInfo", 
    child: "sizeClassifier", 
    attr: { type: "field_13_choice" }
  },
  field_14_choice: { 
    wrapper: "legalEntityNameInfo", 
    child: "legalEntityName", 
    attr: { type: "field_14_choice" }
  },
  field_15_choice: { 
    wrapper: "taxPayerRegistrationNumberInfo", 
    child: "taxPayerRegistrationNumber", 
    attr: { type: "field_15_choice" }
  },
  field_16_choice: { 
    wrapper: "segmentMembershipInfo", 
    child: "segmentMembership", 
    attr: { type: "field_16_choice" }
  },
  field_17_choice: { 
    wrapper: "residencyInfo", 
    child: "residency", 
    attr: { type: "field_17_choice" }
  },
  field_18_choice: { 
    wrapper: "sideLegalEntityNameInfo", 
    child: "sideLegalEntityName", 
    attr: { type: "field_18_choice" }
  },
  field_19_choice: { 
    wrapper: "sideResidencyInfo", 
    child: "sideResidency", 
    attr: { type: "field_19_choice" }
  },
  field_20_choice: { 
    wrapper: "sideLegalStatusInfo", 
    child: "sideLegalStatus", 
    attr: { type: "field_20_choice" }
  },
  field_21_choice: { 
    wrapper: "intentClassifierInfo", 
    child: "intentClassifier", 
    attr: { type: "field_21_choice" }
  },
  field_22_choice: { 
    wrapper: "intentCodeInfo", 
    child: "intentCode", 
    attr: { type: "field_22_choice" }
  },
  field_23_choice: { 
    wrapper: "transferAmountInfo", 
    child: "transferAmount", 
    attr: { type: "field_23_choice" }
  },
  field_24_choice: { 
    wrapper: "sidePaymentInfo", 
    child: "sidePayment", 
    attr: { type: "field_24_choice" }
  }
};

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const changed = [];
  document.querySelectorAll("#\\32 4form [name]").forEach(el => {
    if (el.disabled || el.hidden) {
      changed.push({
        el,
        disabled: el.disabled,
        hidden: el.hidden,
        styleDisplay: el.style.display
      });
      el.disabled = false;
      el.hidden = false;
      el.style.display = "";
    }
  });

  const formData = new FormData(form);

  let xmlData = '<?xml version="1.0" encoding="UTF-8"?><mods>';

  for (let [name, value] of formData.entries()) {
    console.log("Got field:", name, "=", value);
    let map = fieldMapping[name.replaceAll('-','_')];
    if (value == 'freeTyping') continue;
    if (!map) {
      map = fieldMapping[name.replaceAll('-extra','').replaceAll('-','_')];
      if (!map || value == '') {
        continue;
      }
    }

    xmlData += `<${map.wrapper} type="${map.attr.type}">`;
    xmlData += `<${map.child}>${escapeXml(value)}</${map.child}>`;
    xmlData += `</${map.wrapper}>`;
  }

  xmlData += '</mods>';

  console.log("Sending XML:", xmlData);
  const blob = new Blob([xmlData], { type: "application/xml" });
  downloadBtn.download = "transfer.xml";
  downloadBtn.href = URL.createObjectURL(blob);
  downloadBtn.click();
  URL.revokeObjectURL(downloadBtn.href);

  changed.forEach(({el, disabled, hidden, styleDisplay}) => {
    el.disabled = disabled;
    el.hidden = hidden;
    el.style.display = styleDisplay;
  });

  const response = await fetch("http://localhost:3000/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "text/xml"
    },
    body: xmlData
  });

  location.reload();
});



function escapeXml(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
}
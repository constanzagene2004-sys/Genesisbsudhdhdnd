/* Malla: 8 semestres.
   NOTA: Hice un mapeo detallado basado en las fotos. Si falta alguna conexión, me indicas y lo actualizo.
*/

const malla = [
  // Semestre 1
  {
    title: "Semestre I",
    certificate: null,
    ramos: [
      { id: "MAT1110", name: "Nivelación Matemática (MAT1110)" },
      { id: "PLC1101", name: "Habilidades básicas de comunicación (PLC1101)" },
      { id: "INU1101", name: "Inglés Básico I (INU1101)" },
      { id: "TEA1111", name: "Herramientas Tecnológicas (TEA1111)" },
      { id: "FCE1100", name: "Fundamentos de Antropología (FCE1100)" },
    ]
  },

  // Semestre 2
  {
    title: "Semestre II",
    certificate: null,
    ramos: [
      { id: "MAT2110", name: "Álgebra (MAT2110)", prerequisitos: ["MAT1110"] },
      { id: "PLC2101", name: "Habilidades de Comunicación Efectiva (PLC2101)", prerequisitos: ["PLC1101"] },
      { id: "INU2101", name: "Inglés Básico II (INU2101)", prerequisitos: ["INU1101"] },
      { id: "INF101", name: "Introducción a la Informática (INF101)" },
      { id: "EMP1101", name: "Mentalidad Emprendedora (EMP1101)" }
    ]
  },

  // Semestre 3
  {
    title: "Semestre III",
    certificate: "Certificado en Análisis Contable y Presupuestario",
    ramos: [
      { id: "MAT4110", name: "Estadística Descriptiva (MAT4110)", prerequisitos: ["MAT2110"] },
      { id: "COA1111", name: "Contabilidad (COA1111)" },
      { id: "COA2111", name: "Contabilidad para la gestión empresarial (COA2111)", prerequisitos: ["COA1111"] },
      { id: "COA3111", name: "Control presupuestario y costos (COA3111)", prerequisitos: ["COA2111"] },
      { id: "TEA4121", name: "Software de gestión financiera (TEA4121)", prerequisitos: ["TEA1111"] },
    ]
  },

  // Semestre 4
  {
    title: "Semestre IV",
    certificate: null,
    ramos: [
      { id: "MAT4150", name: "Estadística Inferencial (MAT4150)", prerequisitos: ["MAT4110"] },
      { id: "FIS101", name: "Física I (FIS101)" },
      { id: "ADA1111", name: "Administración y Modelos de Negocios (ADA1111)" },
      { id: "INI3111", name: "Inglés Elemental (INI3111)", prerequisitos: ["INU2101"] },
      { id: "FZA1111", name: "Mercados Financieros (FZA1111)" }
    ]
  },

  // Semestre 5
  {
    title: "Semestre V",
    certificate: "Certificado en Gestión Financiera",
    ramos: [
      { id: "ADA2111", name: "Diagnóstico Empresarial (ADA2111)", prerequisitos: ["ADA1111"] },
      { id: "FZA2111", name: "Finanzas de corto plazo (FZA2111)", prerequisitos: ["FZA1111"] },
      { id: "FZA3111", name: "Finanzas de largo plazo (FZA3111)", prerequisitos: ["FZA2111"] },
      { id: "COA4111", name: "Procesos Tributarios y Laborales (COA4111)", prerequisitos: ["COA3111"] },
      { id: "ADA3111", name: "Análisis Económico (ADA3111)", prerequisitos: ["ADA2111"] }
    ]
  },

  // Semestre 6
  {
    title: "Semestre VI",
    certificate: "Certificado en Gestión Estratégica",
    ramos: [
      { id: "ADA5111", name: "Administración Estratégica (ADA5111)", prerequisitos: ["ADA3111"] },
      { id: "ADA6111", name: "Control de Gestión y BSC (ADA6111)", prerequisitos: ["ADA3111"] },
      { id: "ADA7111", name: "Gestión de Calidad (ADA7111)", prerequisitos: ["ADA3111"] },
      { id: "FZA4111", name: "Taller de Financiamiento (FZA4111)", prerequisitos: ["FZA3111"] },
      { id: "PLA1605", name: "Práctica Laboral (PLA1605)", prerequisitos: ["FZA3111"] } // aparece vinculada
    ]
  },

  // Semestre 7
  {
    title: "Semestre VII",
    certificate: "Certificado en Evaluación de Proyectos",
    ramos: [
      { id: "ADA6121", name: "Economía para la Gestión (ADA6121)", prerequisitos: ["ADA3111"] },
      { id: "ADA7121", name: "Formulación y Evaluación de Proyectos (ADA7121)", prerequisitos: ["ADA6121","ADA3111"] },
      { id: "FZA5121", name: "Taller de Inversiones (FZA4121)", prerequisitos: ["FZA3111"] },
      { id: "INI5111", name: "Inglés Intermedio (INI5111)", prerequisitos: ["INI3111"] }
    ]
  },

  // Semestre 8
  {
    title: "Semestre VIII",
    certificate: null,
    ramos: [
      { id: "PTA1605", name: "Portafolio de Título (PTA1605)", prerequisitos: ["ADA7121","IAV7_APPROVED"] }, // IAV7_APPROVED is conceptual: indica aprobación 1 a 7 niveles
      { id: "PPA1605", name: "Práctica Profesional (PPA1605)", prerequisitos: ["IAV7_APPROVED"] },
      { id: "ESP1318", name: "Especialidad Finanzas (ESP1318)", prerequisitos: ["FZA3111"] },
      { id: "ADA7122", name: "Ética Profesional (EAA1605)", prerequisitos: [] }
    ]
  }
];


/* -----------------------
   Manejo de aprobados
   ----------------------- */
const LS_KEY = "malla_aprobados_duoc_v1";
let aprobados = JSON.parse(localStorage.getItem(LS_KEY) || "[]");

/* Por facilidad: soportamos una "condición" especial IAV7_APPROVED que representará
   "están aprobados los niveles 1 a 7" — en la malla se muestra con un control
   que permite marcar esa condición (útil para salida intermedia / requisito de portafolio).
*/
if (!localStorage.getItem("IAV7_APPROVED")) localStorage.setItem("IAV7_APPROVED", "false");


function guardarEstado(){
  localStorage.setItem(LS_KEY, JSON.stringify(aprobados));
}

/* comprobar si un ramo está desbloqueado */
function isDesbloqueado(ramo){
  if (!ramo.prerequisitos || ramo.prerequisitos.length === 0) return true;
  return ramo.prerequisitos.every(pr => {
    // si requisito es la marca especial IAV7_APPROVED:
    if (pr === "IAV7_APPROVED") return localStorage.getItem("IAV7_APPROVED") === "true";
    return aprobados.includes(pr);
  });
}

/* montar la malla en DOM */
function crearMalla(){
  const cont = document.getElementById("malla");
  cont.innerHTML = "";

  malla.forEach((sem, semIndex) => {
    const card = document.createElement("div");
    card.className = "semestre";

    const h = document.createElement("h2");
    h.textContent = `${sem.title}`;
    card.appendChild(h);

    if (sem.certificate) {
      const cert = document.createElement("div");
      cert.className = "certificate";
      cert.textContent = sem.certificate;
      card.appendChild(cert);
    }

    sem.ramos.forEach(ramo => {
      const rdiv = document.createElement("div");
      rdiv.className = "ramo";

      const left = document.createElement("div");
      left.style.display = "flex";
      left.style.alignItems = "center";
      left.innerHTML = `<strong>${ramo.name.split(" (")[0]}</strong><span class="code">${ramo.id || ""}</span>`;

      const badge = document.createElement("div");
      badge.className = "badge";

      const desbloqueado = isDesbloqueado(ramo);
      const estaAprobado = aprobados.includes(ramo.id);

      if (!desbloqueado) {
        rdiv.classList.add("bloqueado");
        badge.textContent = "Bloqueado";
      } else if (estaAprobado) {
        rdiv.classList.add("aprobado");
        badge.textContent = "Aprobado";
      } else {
        rdiv.classList.add("no-aprobado");
        badge.textContent = "No aprobado";
      }

      // tooltip con prerequisitos faltantes
      if (!desbloqueado) {
        const faltantes = (ramo.prerequisitos || []).filter(pr => {
          if (pr === "IAV7_APPROVED") return localStorage.getItem("IAV7_APPROVED") !== "true";
          return !aprobados.includes(pr);
        });
        rdiv.title = "Prerrequisitos faltantes: " + faltantes.join(", ");
      }

      rdiv.appendChild(left);
      rdiv.appendChild(badge);

      // click handler
      rdiv.addEventListener("click", (e) => {
        if (!desbloqueado) {
          // mostrar breve feedback
          showToast("Este ramo está bloqueado hasta aprobar los prerrequisitos.");
          return;
        }
        // toggle aprobado
        if (estaAprobado) {
          aprobados = aprobados.filter(x => x !== ramo.id);
        } else {
          aprobados.push(ramo.id);
        }
        guardarEstado();
        crearMalla();
      });

      card.appendChild(rdiv);
    });

    // si es el último semestre mostramos un control especial para la condición I-VII aprobados
    if (semIndex === malla.length - 1) {
      const divControl = document.createElement("div");
      divControl.style.marginTop = "10px";
      divControl.style.fontSize = "13px";

      const chk = document.createElement("input");
      chk.type = "checkbox";
      chk.id = "iav7";
      chk.checked = (localStorage.getItem("IAV7_APPROVED") === "true");
      chk.addEventListener("change", (ev) => {
        localStorage.setItem("IAV7_APPROVED", ev.target.checked ? "true" : "false");
        crearMalla();
      });

      const label = document.createElement("label");
      label.htmlFor = "iav7";
      label.style.marginLeft = "8px";
      label.textContent = "Marcar I a VII nivel aprobado (salida intermedia)";

      divControl.appendChild(chk);
      divControl.appendChild(label);
      card.appendChild(divControl);
    }

    cont.appendChild(card);
  });
}

/* simple toast */
function showToast(text){
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    t.style.position = "fixed";
    t.style.bottom = "16px";
    t.style.left = "50%";
    t.style.transform = "translateX(-50%)";
    t.style.background = "#222";
    t.style.color = "#fff";
    t.style.padding = "10px 14px";
    t.style.borderRadius = "8px";
    t.style.opacity = "0.95";
    document.body.appendChild(t);
  }
  t.textContent = text;
  t.style.display = "block";
  setTimeout(()=>{ t.style.display = "none"; }, 1900);
}

/* init */
crearMalla();

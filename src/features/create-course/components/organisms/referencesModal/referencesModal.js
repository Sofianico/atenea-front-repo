import React, { useContext } from "react";

import { ModalContext } from "@/stores/ModalContextProvider";
import styles from "./referencesModal.module.css";

export default function ReferencesModal({ message }) {
  console.log(message);

  /**
 {
    "content": "Python es un lenguaje de programación de alto nivel ampliamente utilizado para aplicaciones web y para las API de backend que soportan las aplicaciones móviles. Es utilizado por empresas como Google, YouTube, Dropbox, Instagram, Quora y Reddit. Python permite la creación de variedad de aplicaciones, incluso en administración de sistemas y ciencia de datos. Su facilidad de uso y versatilidad, junto con una gran comunidad de usuarios, ha llevado a su adopción generalizada en múltiples dominios.\n",
    "role": "assistant",
    "refs": [
        "The iceberg is called the Python Data Model, and it is the API\nthat we use to make our own objects play well with the most idiomatic language\nfeatures.\nYou can think of the data model as a description of Python as a framework. It formal‐\nizes the interfaces of the building blocks of the language itself, such as sequences,\nfunctions, iterators, coroutines, classes, context managers, and so on.\nWhen",
        "ment\nPython is widely used in web applications and for the backend APIs supporting\nmobile applications. How is it that Google, YouTube, Dropbox, Instagram, Quora,\nand Reddit—among others—managed to build Python server-side applications serv‐\ning hundreds of millions of users 24x7? Again, the answer goes way beyond what\nPython provides “out of the box.”\nBefore we discuss tools to support Python at ",
        "ay know from reading The Python Tutorial or\nfrom experience with another mainstream object-oriented language, such as Java, C#,\nor C++. Here we’ll focus on four characteristics of Python:\n\n• The super() function\n• The pitfalls of subclassing from built-in types\n• Multiple inheritance and method resolution order\n• Mixin classes\n\nMultiple inheritance is the ability of a class to have more than one b",
        "cution, thanks to libraries and software architectures that work around the limita‐\ntions of CPython.\nNow let’s discuss how Python is used in system administration, data science, and\nserver-side application development in the multicore, distributed computing world\nof 2021.\n\nSystem Administration\nPython is widely used to manage large fleets of servers, routers, load balancers, and\nnetwork-attached ",
        "rs, routers, load balancers, and\nnetwork-attached storage (NAS). It’s also a leading option in software-defined net‐\nworking (SDN) and ethical hacking. Major cloud service providers support Python\nthrough libraries and tutorials authored by the providers themselves or by their large\ncommunities of Python users.\nIn this domain, Python scripts automate configuration tasks by issuing commands to\nbe c"
    ]
}
   */

  return (
    <div className={styles.referencesModal}>
      <div className={styles.header}>
        <div className={styles.title}>Resultado generado por IA</div>
      </div>

      <div className={styles.section}>
        <div className={styles.subtitle}>Texto generado</div>

        <div className={styles.message}>{message.content}</div>
      </div>

      <div className={styles.section}>
        <div>
          <div className={styles.subtitle}>Referencias utilizadas</div>
          <div className={styles.description}>
            A continuación se listan las fuentes en las que se basó la IA para
            generar el contenido anterior:
          </div>
        </div>

        <div className={styles.refs}>
          {message.refs.map((r, i) => (
            <div key={i}>
              <div className={styles.fileName}>{r.fileName}</div>
              <div className={styles.content}>{r.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

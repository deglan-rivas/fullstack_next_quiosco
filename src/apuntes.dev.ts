// s58
// features de nextjs -> preconfigurado ; optimizaciones image link caching ; en ts ; routing ; data fetching ; rendering in server and client ez
// crear el proyecto -> pnpm dlx create-next-app@latest ; cd x ; pnpm dev ; borrar tailwind.config.ts ; global.css ; y contenido de .tsx
// naming y files reservados -> page ; layout ; segments o folders para routing ; route not-found error loading etc
// rendering -> use server por default, use client -> orden render unidireccional, use client heredado -> cuándo? server components para  orm, auth, token, files -> client components para api navegador LS o GeoLocation, react hooks useState, eventos onClick onChange, libs de terceros como zustand que usan useRef por debajo
// contenedores principales -> order(s) y products

// recordar siempre estilar contenedores antes de contenido
// usar responsive viewer plugin chrome web store para tomar mejores decisiones y crear el responsive design desde el inicio
// de preferencia siempre estandarizar: si es folder products/ entonces que sea orders/ en plural y minúscula

// TODOs
// por alguna razón me siguen saliendo los console.logs del use client en la consola del server



// s59
// prisma orm: prisma query, prisma migrate y prisma studio
// pnpm i -D prisma ; pnpm i @prisma/client ; pnpm exec prisma init ; 
// crear el dockerfile ; actualizar el .env ; definir los models siguiendo la documentación uff que top esa documentación ez relations ; pnpm exec prisma migrate dev -> darle nombre category_product_relation ejm ; pnpm exec prisma studio uff joyita pero de pago en prod v':
// seguir documentación de prisma seed para generar nuestro seed ez -> el categoryId está hardcodead en products.ts por eso si borramos el id autoincremental aumentará y no habrá match, de paso no guardar data en el volume de dockerfile -> agregué el --transpile-only para obviar el tipado según prisma docs y da error de bundler, pero al final de la misma documentación dice que para next hay que usar un comando especial de --compiler-options xd -> validar con pnpm exec prisma studio

// TODOs
// estaría bueno usar el connection string de la db como una variable de entorno



// 60
// el data fetching es usar un async await en componentes :o junto al prismaClient nomás -> notar que se usa una instancia global de "prisma" para evitar tener un pool de conexiones abierto
// iterar en el arreglo de categories obtenido ez
// básicamente lo más importante además de usar Image y Link es el routing dinámico con folders anidados usando [my_param]



// 61
// usar prisma o sql para traer todas las categorías
// iterarlas y renderizarlas
// me parece mejor usar el width y height para definir los ratios, eso ya escala solito, usar el fill a veces no funca bien -> quality puede ser útil para reducir pesos de imágenes, no olvidar darle título y agregar button que luego será "use client"
// el params solo está definido en archivos asociados al routing dinámico: page, layout, route y uno raro llamado generateMetaData -> usar useParams en otros files tipo componentes de ui, pero se tiene que agregar el "use client", se puede agregar un genérico para tiparlo, agregar clases condicionales para resaltar category seleccionada
// notar el caching de querys al cambiar de category, lazy loading de Images y la conversión de jpb o svg a webp incluso modificando quality de Image


// TODOs
// si entramos primero a /order y clickeamos cafe se muestras las imágenes, pero si ingresamos directamente a /order/cafe aparece broken y se muestra su alt xd



// 62
// crea el store con zustand comenzando por type OrderItem ez es create y no createStore xd -> zustand solo se puede usar en el cliente
// crear el add, remove, update y clear methods -> mover solo el button al lado del cliente para que tarde en renderizar, así evitamos hacer use client todo el componente del ProductCard -> no confundir el {data, x:y} con {...data,x:y} el primero tiene dobles llaves, el segundo rompe la referencia
// solo destacar el caching del total con useMemo en OrdenSummaty y el disabled al llegar a MAX_ITEMS o MIN_ITEMS en OrderItem



// 63
// relación de muchos a muchos con tabla pivote entre Ordenes y Products -> si colocamos correctamente el fields y nos dice fields invalid es porque entonces es un syntax error y sí: faltaba una coma entre fileds y references :D -> todo model debe tener una PK o dará error xd @id nomás o @uuid
// server actions son async fn's asociados al crud pues actúan como si fueran llamadas al backend, por eso deben tener use server, hacer la misma jugada que separar con use client por si todo el componente es use server pero al revés xd, pueden ir en useEffect u OnClick de preferencia en form -> notar que el snippet rfc o rfce no agrega el async, qué loco ver async components en react xd
// maquetar un form button submit y input text, crear un action use server en su folder, incluirlo en el handleX del componente use clent, validar con un console.log ez
// pnpm i zod, usar zod para crear un OrderSchema y validar el input del form
// pnpm i react-tostify, mostrar todos los errores obntenidos con zod
// validar los errores nuevamente en el servidor, pues se puede desactivar el js desde el frontend y rip validaciones xD, antxdev me parece que subió algunos clones a yt usando "html first"
// también validar el total y order

// ingresar la data a la db, de preferencia usar transactions en prisma o typeorm
// armar las validaciones con zod siempre a partir del user input, esa data se valida, lo que se ingresa a la db es una data formateada -> en el server mejor tipar la data como unknown antes que any, pues el mismo zod lo valida
// el ToastNotification es use client no olvidar xd de preferencia en layout.tsx que no sea el principal, no sé por qué da warnings, fácil es hydratation
// aproveché en tipar la respuesta del create-order.action.ts tal cual como si fuera response de api
// los actions son files .ts, formData es jodido de trabajar usar full chatgpt o copilot o codeium, zod puede manejar el unknown y de hecho es mejor que el any, las transacciones con prisma son más fáciles que con typeorm, es mejor hacer varios videos cortos para no omitir información ni regrabar los videos tantas veces por la misma razón que estudiar todos los días un poco es mejor que estudiar todo un día antes

// TODOs
// lo único que falta es saber cómo formatear el input text al ejecutar un action xD antes hacía un e.preventDefault justamente para evitarlo, ahora no sé cómo forzar el reset
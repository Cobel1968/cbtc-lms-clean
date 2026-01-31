exports.id=575,exports.ids=[575],exports.modules={7375:(e,s,a)=>{"use strict";a(43353)},62988:(e,s,a)=>{"use strict";a(43353),a(7375)},82577:(e,s,a)=>{"use strict";a(7375),a(8210)},40575:(e,s,a)=>{"use strict";a(62988),a(82577);var t=a(65302);if(a.o(t,"createRouteHandlerClient")&&a.d(s,{createRouteHandlerClient:function(){return t.createRouteHandlerClient}}),a(43353),"undefined"!=typeof process&&process.env?.npm_package_name){let e=process.env.npm_package_name;["@supabase/auth-helpers-nextjs","@supabase/auth-helpers-react","@supabase/auth-helpers-remix","@supabase/auth-helpers-sveltekit"].includes(e)&&console.warn(`
╔════════════════════════════════════════════════════════════════════════════╗
║ ⚠️  IMPORTANT: Package Consolidation Notice                                ║
║                                                                            ║
║ The ${e.padEnd(35)} package name is deprecated.  ║
║                                                                            ║
║ You are now using @supabase/ssr - a unified solution for all frameworks.  ║
║                                                                            ║
║ The auth-helpers packages have been consolidated into @supabase/ssr       ║
║ to provide better maintenance and consistent APIs across frameworks.      ║
║                                                                            ║
║ Please update your package.json to use @supabase/ssr directly:            ║
║   npm uninstall ${e.padEnd(42)} ║
║   npm install @supabase/ssr                                               ║
║                                                                            ║
║ For more information, visit:                                              ║
║ https://supabase.com/docs/guides/auth/server-side                         ║
╚════════════════════════════════════════════════════════════════════════════╝
    `)}},65302:()=>{},8210:(e,s,a)=>{"use strict";var t=a(83543);t.Qc,t.qC},43353:(e,s,a)=>{"use strict";a(8210);let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),r=" 	\n\r=".split("");(()=>{let e=Array(128);for(let s=0;s<e.length;s+=1)e[s]=-1;for(let s=0;s<r.length;s+=1)e[r[s].charCodeAt(0)]=-2;for(let s=0;s<t.length;s+=1)e[t[s].charCodeAt(0)]=s})()}};
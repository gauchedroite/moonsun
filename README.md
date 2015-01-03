moonsun
===
Interactive adventure game implemented with **React** and **TypeScript**. Uses **webpack** to package the application.

Only the basic initial application structure is kept in this **boilerplate** branch. Hopefully I can reuse this layout in similar projects.

There are three related projects here: the Node **[server](server)**, the **[public](public)** files for the game and **[ts](ts)** for the actual TypeScript sources.
The rationale for having an additional **ts** project instead of using **public** for all the sources is because of the (lack of) support of TypeScript in webpack loaders.
Instead of relying on a loader, I use TypeScript (in a standalone Visual Studio project) to compile javascript and move the output to the **public** project.
Once in **public** webpack kicks in and life is good.

Installation
---
The installation instructions are in each project's folder.

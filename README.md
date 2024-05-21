# SupaRBAC

SupaRBAC is an open source, self-hosted service for developers to add RBAC to their Supabase apps.

You can read more about the motivation and architecture [here](https://supatable.com/suparbac).

This repository includes:

* A Next.js application named Suparbac.
* A separate integration testing app named Suparbaca-app.

## Suparbac

Suparbac is a Next.js app, you can deploy to a hosted service. To get started, you'll need to configure Suparbac to connect to your Supabase instance by setting the appropriate environment variables. Once that's done, your app will connect to Suparbac, which will then act as an intermediary, forwarding most of your requests to Supabase on your behalf.

Suparbac acts like a security guard for your Supabase data, especially for sensitive actions like creating, reading, updating, or deleting tables or views. When these requests come through Suparbac, it will check if the user making the request has the necessary permissions before allowing it to proceed to Supabase. This helps ensure that only authorized users can modify your data.

# Suparbaca-app

Suparbaca-app serves 2 purposes:

* **Provides a blueprint for integrating your app with Suparbac:** The Suparbaca-app acts as a reference guide, showcasing how to configure your own application to seamlessly work with Suparbac. By following its example, you'll gain a clear understanding of the steps required for a successful integration.
* **Ensures Suparbac functions flawlessly without compromising Supabase:** The Suparbaca-app incorporates integration tests. These tests serve a critical purpose: verifying that Suparbac operates as intended without introducing any disruptions to the core functionalities of Supabase. 

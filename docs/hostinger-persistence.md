# Persistance Hostinger

L'application contient une API PHP compatible Hostinger dans `public/api`.
Au build, Vite copie ces fichiers dans `dist/api`, puis GitHub Actions les déploie vers :

```text
/domains/ekimmo.pro/public_html/
```

## Secrets GitHub à créer

Créer une base MySQL dans hPanel, puis ajouter ces secrets dans le dépôt GitHub :

```text
HOSTINGER_DB_HOST
HOSTINGER_DB_NAME
HOSTINGER_DB_USER
HOSTINGER_DB_PASSWORD
HOSTINGER_APP_STATE_ID
```

`HOSTINGER_APP_STATE_ID` est optionnel. Valeur recommandée :

```text
production
```

Au prochain déploiement, le workflow génère automatiquement :

```text
dist/api/config.php
```

Ce fichier n'est pas versionné dans Git.

## Test attendu

Avant configuration, l'API répond :

```json
{"ok":false,"code":"missing_config","message":"Configuration base de données absente."}
```

Après configuration, l'URL suivante doit répondre avec `ok: true` :

```text
https://ekimmo.pro/api/state.php
```

La table `ekimmo_app_state` est créée automatiquement au premier appel API valide.


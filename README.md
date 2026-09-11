# Clínica Dental Neclatrony - Sistema de Hiperautomatización y Agentes de IA

**Trabajo Final de Máster (TFM)**  
**Máster en Agentes de IA e Hiperautomatización de Procesos (MAP)**  
**EBIS Business Techschool**

## Estructura del Repositorio

- docs/: Memoria completa del proyecto (.docx y .md), Process Design Document (PDD) y diagramas BPMN.
- mock-erp/: Código fuente de la aplicación web simulada de gestión dental (Mock ERP).
- 
8n-workflows/: Blueprints JSON de los workflows orquestadores y agentes de IA.
- supabase/: Esquema de base de datos relacional y base vectorial pgvector para RAG.
- uipath-robot/: Proyecto de automatización robótica (ReFramework).

## Arquitectura de la Solución
Telegram Bot API <-> n8n (Multi-Agent + HITL) <-> Supabase (PostgreSQL + pgvector) <-> UiPath Robot <-> Mock ERP Web

#!/usr/bin/env python3
"""Atualização diária leve: valida data e preserva os cadastros manuais.
A coleta de Instagram não é implementada por scraping não oficial.
"""
import json
from datetime import date
from pathlib import Path

DATA = Path(__file__).with_name("data.json")

def main():
    payload = json.loads(DATA.read_text(encoding="utf-8"))
    payload["last_updated"] = date.today().isoformat()
    # O arquivo mantém horários e eventos inseridos manualmente.
    # Integrações automáticas devem usar APIs oficiais ou feeds autorizados.
    DATA.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Dados verificados e data de atualização registrada: {payload['last_updated']}")
    print(f"Locais cadastrados: {len(payload.get('churches', []))}")
    print(f"Eventos cadastrados: {len(payload.get('events', []))}")

if __name__ == "__main__":
    main()

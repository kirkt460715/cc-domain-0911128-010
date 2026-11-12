import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Registers } from '../ledger/registers.js';
test('交付数量与费用关联原始台账',()=>{
  const d=JSON.parse(readFileSync(new URL('../fixtures/study-input.json',import.meta.url),'utf8'));
  const r=new Registers(d.document);
  for(const lot of d.delivery_lots){assert.ok(r.deliverables.has(lot.delivery));assert.ok(lot.quantity>0);}
  for(const link of d.delivery_cost_links){assert.ok(r.expenses.has(link.expense));assert.ok(r.deliverables.has(link.delivery));assert.ok(link.amount_cents>0);}
});

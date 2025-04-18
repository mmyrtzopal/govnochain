// Simplified on-chain redistribution smart contract
contract GOVNOCHAIN {
  address admin;
  address jettonMaster;
  int minDeposit;
  int adminPercent;

  map<address, int> balances;

  constructor(address _admin, address _jettonMaster, int _minDeposit, int _adminPercent) {
    admin = _admin;
    jettonMaster = _jettonMaster;
    minDeposit = _minDeposit;
    adminPercent = _adminPercent;
  }

  receive("deposit", slice sender, int amount) {
    require(amount >= minDeposit, "Минимальный вход не достигнут");

    balances::set(sender, balances::get(sender) + amount);
    int toAdmin = amount * adminPercent / 100;
    int remainder = amount - toAdmin;

    send(admin, toAdmin); // Отправляем процент админу

    print("Депозит от", sender, "на сумму", amount);
  }

  receive("claim", slice sender) {
    int balance = balances::get(sender);
    require(balance > 0, "Ничего не накопилось");

    send(sender, balance);
    balances::set(sender, 0);

    print("Claim для", sender, "на сумму", balance);
  }

  get balanceOf(address user): int {
    return balances::get(user);
  }
}

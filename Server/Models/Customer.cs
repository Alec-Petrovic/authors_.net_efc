using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Customer
{
    public string CusId { get; set; } = null!;

    public string CusFname { get; set; } = null!;

    public string CusLname { get; set; } = null!;

    public string CusPhone { get; set; } = null!;

    public string CusAddress { get; set; } = null!;

    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();
}

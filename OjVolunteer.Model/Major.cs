
//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------


namespace OjVolunteer.Model
{


using System;
    using System.Collections.Generic;
    
[Serializable]
public partial class Major
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]

    public Major()
    {

        this.UserInfo = new HashSet<UserInfo>();

    }


    public int MajorID { get; set; }

    public string MajorName { get; set; }

    public Nullable<System.DateTime> CreateTime { get; set; }

    public Nullable<System.DateTime> ModfiedOn { get; set; }

    public string Remark { get; set; }

    public short Status { get; set; }



    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<UserInfo> UserInfo { get; set; }

}

}
